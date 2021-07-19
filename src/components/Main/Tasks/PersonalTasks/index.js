import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewTaskPersonal from '../../../Forms/NewTaskPersonal'
import ModalComponent from '../../../SharedComponents/ModalComponent'
import { move, reorder } from '../functions'
import DragAndDrop from '../DragAndDrop'
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery'
import { MOVE_TASK_COLUMN_PERSONAL, MOVE_TASK_PERSONAL, NEW_TASK_PERSONAL } from '../../../../graphql/gql/task/mutation'
import { MY_INFO } from '../../../../graphql/queries/user/MyInfoQuery'



const PersonalTasks = () => {

    const dispatch = useDispatch()
    
    const { myInfo } = useSelector(state => state.user)
    const { newTask } = useSelector(state => state.form)
    const { taskColumns } = useSelector(state => state.task)

    const [openNewTaskPersonalModal, setOpenNewTaskPersonalModal] = useState(false)

    const cancelNewTaskPersonal = () => {
        setOpenNewTaskPersonalModal(false)
        dispatch({ type: "RESET_FORM" })
    }


    const [newTaskPersonal] = useMutation(NEW_TASK_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO
            })
            if (data) {
                const newData = { ...data.myInfo, personalTaskColumns: [ ...data.myInfo.personalTaskColumns.map(column => {
                    if(column._id === result.data.newTaskPersonal.columnId) {
                        return { ...column, tasks: [ result.data.newTaskPersonal, ...column.tasks ] }
                    } else {
                        return { ...column }
                    }
                }) ] } 
                proxy.writeQuery({
                    query: MY_INFO,
                    data: {
                        myInfo: { ...newData }
                    }
                })
                cancelNewTaskPersonal()
                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })
                dispatch({ type: "NEW_TASK_PERSONAL", payload: { newTaskPersonal: result.data.newTaskPersonal } })
            }

        },
        variables: { description: newTask.description, columnId: newTask.columnId  }
    })

    const [moveTaskColumnPersonal] = useMutation(MOVE_TASK_COLUMN_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO
            })
            if (data) {
                const newData = { ...data.myInfo, personalTaskColumns: [ ...result.data.moveTaskColumnPersonal.newSequenceIds.map((seq, index) => {
                    const targetColumn = data.myInfo.personalTaskColumns.find(column => column._id === seq)
                    return { ...targetColumn, sequence: index + 1 }
                }) ] }
                console.log("NEW DATA", newData);
                proxy.writeQuery({
                    query: MY_INFO,
                    data: {
                        myInfo: { ...newData }
                    }
                })

                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })
            }
            //variables & newColumnOrder for redux state dispatch @ onDragEnd function
        },
    })

    const [moveTaskPersonal] = useMutation(MOVE_TASK_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO
            })
            if (data) {
                const targetTask = data.myInfo.personalTaskColumns.find(col => col._id === result.data.moveTaskPersonal.sourceColumnId).tasks.find(task => task._id === result.data.moveTaskPersonal.taskId)
                const newTaskColumns = data.myInfo.personalTaskColumns.map(column => {
                    if (column._id === result.data.moveTaskPersonal.sourceColumnId) {
                        return { ...column, tasks: [...column.tasks.filter(task => task._id !== result.data.moveTaskPersonal.taskId)] }
                    }
                    else if (column._id === result.data.moveTaskPersonal.destinationColumnId) {
                        return { ...column, tasks: [targetTask, ...column.tasks] }
                    }
                    else {
                        return { ...column }
                    }
                })
                const newData = { ...data.myInfo, personalTaskColumns: [ ...newTaskColumns ] }
                proxy.writeQuery({
                    query: MY_INFO,
                    data: {
                        myInfo: { ...newData }
                    }
                })
                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })

            }
            // PENDING DISPATCH SOLUTION IF UPDATE FAILED ON SERVER/DB
        },
        // variables & updateTaskColumns for moved task for the redux state dispatch @ onDragEnd function
    })

    useEffect(() => {
        const tempArray = [...myInfo.personalTaskColumns]
        const taskColumns =tempArray.sort((a, b) => a.sequence - b.sequence)
        dispatch({ type: "TASK_COLUMNS_PERSONAL", payload: { taskColumns } })
        return () => {
            dispatch({ type: "TASK_COLUMNS_PERSONAL", payload: { taskColumns: null } })
        }
    }, [])



    const onOpenNewTaskPersonalModal = (columnId) => {
        setOpenNewTaskPersonalModal(true)
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
            moveTaskColumnPersonal({ variables: { taskColumnIds } })
            dispatch({ type: "ON_DRAG_END_TASK_COLUMN_PERSONAL", payload: { newColumnOrder } })
            return
        }

        const sId = source.droppableId;
        const dId = destination.droppableId;

        if (sId === dId) {
            const tasks = reorder(taskColumns.find(c => c._id === sId).tasks, source.index, destination.index);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = { ...newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)], tasks }
            dispatch({ type: "ON_DRAG_END_TASK_PERSONAL", payload: { newTaskColumns } })
        } else {
            const result = move(taskColumns.find(c => c._id === sId), taskColumns.find(c => c._id === dId), source, destination);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = result[sId];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === dId)] = result[dId];
            dispatch({ type: "ON_DRAG_END_TASK_PERSONAL", payload: { newTaskColumns } })
            moveTaskPersonal({ variables: { sourceColumnId: sId, destinationColumnId: dId, taskId: draggableId } })
        }
    }

    return (
        !taskColumns ? <p>Loading...</p> :
            <main className="p-3 flex flex-1 h-full">


                <ModalComponent
                    open={openNewTaskPersonalModal}
                    onClose={cancelNewTaskPersonal}
                    cancel={cancelNewTaskPersonal}
                    modalTitle="New Personal Task"
                    confirmButtonText="Confirm"
                    confirm={newTaskPersonal}
                >
                    <NewTaskPersonal />
                </ModalComponent>


                {taskColumns.length === 0 ? <p>No Column Added.</p> :

                    <DragAndDrop
                        onDragEnd={onDragEnd}
                        taskColumns={taskColumns}
                        onOpenNewTaskModal={onOpenNewTaskPersonalModal}
                        mainDropprableId="personal-tasks"
                    />}

            </main>
    )
}

export default PersonalTasks
