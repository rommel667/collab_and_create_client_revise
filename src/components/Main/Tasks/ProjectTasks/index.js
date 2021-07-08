import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NewTask from '../../../Forms/NewTask'
import ModalComponent from '../../../SharedComponents/ModalComponent'
import { move, reorder } from '../functions'
import DragAndDrop from '../DragAndDrop'
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery'
import { MOVE_TASK, MOVE_TASK_COLUMN, NEW_TASK } from '../../../../graphql/gql/task/mutation'



const ProjectTasks = () => {

    const { projectId } = useParams()

    const dispatch = useDispatch()
    const { projects } = useSelector(state => state.project)
    const { taskColumns } = useSelector(state => state.task)
    const newTaskData = useSelector(state => state.form.newTask)

    const [openNewTaskModal, setOpenNewTaskModal] = useState(false)

    const cancelNewTask = () => {
        setOpenNewTaskModal(false)
        dispatch({ type: "RESET_FORM" })
    }


    const [newTask] = useMutation(NEW_TASK, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.newTask.projectId) {
                        return {
                            ...project, taskColumns: project.taskColumns.map(column => {
                                if (column._id === result.data.newTask.columnId) {
                                    return { ...column, tasks: [result.data.newTask, ...column.tasks] }
                                } else {
                                    return { ...column }
                                }
                            })
                        }
                    } else {
                        return { ...project }
                    }
                })
                proxy.writeQuery({
                    query: PROJECTS_BY_USER,
                    data: {
                        projectsByUser: [...newData]
                    }
                })
                cancelNewTask()
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "NEW_TASK", payload: { newTask: result.data.newTask } })
            }

        },
        variables: { ...newTaskData }
    })

    const [moveTaskColumn] = useMutation(MOVE_TASK_COLUMN, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER
            })
            if (data) {
                const targetProject = data.projectsByUser.find(project => project._id === result.data.moveTaskColumn.projectId)
                const newTaskColumns = result.data.moveTaskColumn.newSequenceIds.map((seq, index) => {
                    const column = targetProject.taskColumns.find(column => column._id === seq)
                    return { ...column, sequence: index + 1 }
                })
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.moveTaskColumn.projectId) {
                        return { ...project, taskColumns: [...newTaskColumns] }
                    } else {
                        return { ...project }
                    }
                })
                proxy.writeQuery({
                    query: PROJECTS_BY_USER,
                    data: {
                        projectsByUser: [...newData]
                    }
                })
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
            }
            //variables & newColumnOrder for redux state dispatch @ onDragEnd function
        },
    })

    const [moveTask] = useMutation(MOVE_TASK, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER
            })
            if (data) {
                const targetProject = data.projectsByUser.find(project => project._id === result.data.moveTask.projectId)
                const targetTask = targetProject.taskColumns.find(col => col._id === result.data.moveTask.sourceColumnId).tasks.find(task => task._id === result.data.moveTask.taskId)
                const newTaskColumns = targetProject.taskColumns.map(column => {
                    if (column._id === result.data.moveTask.sourceColumnId) {
                        return { ...column, tasks: [...column.tasks.filter(task => task._id !== result.data.moveTask.taskId)] }
                    }
                    else if (column._id === result.data.moveTask.destinationColumnId) {
                        return { ...column, tasks: [targetTask, ...column.tasks] }
                    }
                    else {
                        return { ...column }
                    }
                })
                console.log("NEW", newTaskColumns);
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.moveTask.projectId) {
                        return { ...project, taskColumns: [...newTaskColumns] }
                    } else {
                        return { ...project }
                    }
                })
                proxy.writeQuery({
                    query: PROJECTS_BY_USER,
                    data: {
                        projectsByUser: [...newData]
                    }
                })
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })

            }
            // PENDING DISPATCH SOLUTION IF UPDATE FAILED ON SERVER/DB
        },
        // variables & updateTaskColumns for moved task for the redux state dispatch @ onDragEnd function
    })

    useEffect(() => {
        const projectInfo = projects?.find(project => project._id === projectId)
        const taskColumns = projectInfo.taskColumns
        dispatch({ type: "UPDATE_PROJECT_ID", payload: { projectId } })
        dispatch({ type: "TASK_COLUMNS_BY_PROJECT", payload: { taskColumns } })
        return () => {
            dispatch({ type: "UPDATE_PROJECT_ID", payload: { projectId: "" } })
            dispatch({ type: "TASK_COLUMNS_BY_PROJECT", payload: { taskColumns: null } })
        }
    }, [])


    const onOpenNewTaskModal = (columnId) => {
        setOpenNewTaskModal(true)
        dispatch({ type: "TASK_COLUMN_ID", payload: { columnId } })
    }

    function onDragEnd(result) {
        const { source, destination, draggableId, type } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (type === "column") {
            const newColumnOrder = Array.from(taskColumns)
            const target = newColumnOrder[source.index]
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, target)
            const taskColumnIds = newColumnOrder.map(col => col._id)
            moveTaskColumn({ variables: { taskColumnIds, projectId } })
            dispatch({ type: "ON_DRAG_END_TASK_COLUMN", payload: { newColumnOrder } })
            return
        }

        const sId = source.droppableId;
        const dId = destination.droppableId;

        if (sId === dId) {
            const tasks = reorder(taskColumns.find(c => c._id === sId).tasks, source.index, destination.index);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = { ...newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)], tasks }
            dispatch({ type: "ON_DRAG_END_TASK", payload: { newTaskColumns } })
        } else {
            const result = move(taskColumns.find(c => c._id === sId), taskColumns.find(c => c._id === dId), source, destination);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = result[sId];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === dId)] = result[dId];
            dispatch({ type: "ON_DRAG_END_TASK", payload: { newTaskColumns } })
            moveTask({ variables: { sourceColumnId: sId, destinationColumnId: dId, taskId: draggableId, projectId } })
        }
    }

    return (
        !taskColumns ? <p>Loading...</p> :
            <main className="p-3 flex flex-1 h-full">


                <ModalComponent
                    open={openNewTaskModal}
                    onClose={cancelNewTask}
                    cancel={cancelNewTask}
                    modalTitle="New Task"
                    confirmButtonText="Confirm"
                    confirm={newTask}
                >
                    <NewTask />
                </ModalComponent>


                {taskColumns.length === 0 ? <p>No Column Added. Create minimum of two columns with last column for finished tasks to track your progress.</p> :

                    <DragAndDrop
                        onDragEnd={onDragEnd}
                        taskColumns={taskColumns}
                        onOpenNewTaskModal={onOpenNewTaskModal}
                        mainDropprableId={projectId}
                    />}

            </main>
    )
}

export default ProjectTasks