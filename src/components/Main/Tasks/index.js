import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TASK_COLUMNS_BY_PROJECT } from '../../../graphql/gql/task/query'
import NewTask from '../../Forms/NewTask'
import ModalComponent from '../../SharedComponents/ModalComponent'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { MOVE_TASK, MOVE_TASK_COLUMN, NEW_TASK } from '../../../graphql/gql/task/mutation'
import { getItemStyle, move, moveTaskNewData, reorder } from './functions'
import DroppableComponent from './DroppableComponent'


const Tasks = () => {

    const { projectId } = useParams()

    const dispatch = useDispatch()
    const { projects } = useSelector(state => state.project)
    const newTaskData = useSelector(state => state.form.newTask)

    const projectInfo = projects?.find(project => project._id === projectId)

    const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
    const [updating, setUpdating] = useState(false)

    const cancelNewTask = () => {
        setOpenNewTaskModal(false)
        dispatch({ type: "RESET_FORM" })
    }

    const [fetchTaskColumns, { data }] = useLazyQuery(TASK_COLUMNS_BY_PROJECT,
        { variables: { taskColumnIds: [...projectInfo.taskColumns.map(tc => tc._id)] } },
    )

    const [newTask] = useMutation(NEW_TASK, {
        update(proxy, result) {
            cancelNewTask()
            dispatch({ type: "NEW_TASK", payload: { newTask: result.data.newTask } })
        },
        variables: { ...newTaskData }
    })

    const [moveTaskColumn] = useMutation(MOVE_TASK_COLUMN, {
        update(proxy, result) {
            //variables & newColumnOrder for redux state dispatch @ onDragEnd function
        },
    })

    const [moveTask] = useMutation(MOVE_TASK, {
        update(proxy, result) {
            setUpdating(false)
            // PENDING DISPATCH SOLUTION IF UPDATE FAILED ON SERVER/DB
        },
        // variables & updateTaskColumns for moved task for the redux state dispatch @ onDragEnd function
    })

    useEffect(() => {
        if (projectInfo.taskColumns.length > 0 && projectInfo.taskColumns[0].columnName === undefined) {
            fetchTaskColumns()
        } 
        dispatch({ type: "UPDATE_PROJECT_ID", payload: { projectId } })
    }, [projectInfo])

    useEffect(() => {
        if (data) {
            dispatch({ type: "TASK_COLUMNS_BY_PROJECT", payload: { projectId, taskColumns: data.taskColumnsByProject } })
        }
    }, [data])

    const onOpenNewTaskModal = (columnId) => {
        setOpenNewTaskModal(true)
        dispatch({ type: "TASK_COLUMN_ID", payload: { columnId } })
    }

    function onDragEnd(result) {
        const { source, destination, draggableId, type } = result;
        const { taskColumns } = projectInfo
        // dropped outside the list
        if (!destination || updating) {
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
            dispatch({ type: "ON_DRAG_END_TASK", payload: { projectId, newTaskColumns } })
        } else {
            const result = move(taskColumns.find(c => c._id === sId), taskColumns.find(c => c._id === dId), source, destination);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = result[sId];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === dId)] = result[dId];
            setUpdating(true)
            dispatch({ type: "ON_DRAG_END_TASK", payload: { projectId, newTaskColumns } })
            
            moveTask({ variables: { sourceColumnId: sId, destinationColumnId: dId, taskId: draggableId, projectId } })
            //   setTasks(newTasks.filter(group => group.length));
        }
    }

    return (
        !projectInfo.taskColumns ?
            <p>Loading...</p> :

            <main className="p-3 flex flex-1 h-full">

                {projectInfo.taskColumns.length === 0 && <p>No Column Added. Create minimum of two columns with last column for finished tasks to track your progress.</p>}

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

                <DragDropContext onDragEnd={onDragEnd} className="p-3">

                    <Droppable droppableId={projectId} direction="horizontal" type="column" >
                        {(provided, snapshot) => {
                            return (
                                <div
                                    className={`${snapshot.isDraggingOver ? "bg-blue-200" : ""} flex flex-row w-full gap-2`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <DroppableComponent
                                        setOpen={onOpenNewTaskModal}
                                        taskColumns={projectInfo.taskColumns}
                                        getItemStyle={getItemStyle}
                                    />
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>

                </DragDropContext>
            </main>
    )
}

export default Tasks