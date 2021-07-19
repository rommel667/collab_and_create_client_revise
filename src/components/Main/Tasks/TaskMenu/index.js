import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import MenuItems from './MenuItems';
import ModalComponent from '../../../SharedComponents/ModalComponent';
import EditTask from '../../../Forms/EditTask';
import EditTaskPersonal from '../../../Forms/EditTaskPersonal';
import { useMutation } from '@apollo/client';
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_TASK, DELETE_TASK_PERSONAL, EDIT_TASK, EDIT_TASK_PERSONAL } from '../../../../graphql/gql/task/mutation';
import { MY_INFO } from '../../../../graphql/queries/user/MyInfoQuery';

const TaskMenu = ({ taskId, description, inCharge, columnId }) => {

    const [openTaskEdit, setOpenTaskEdit] = useState(false)
    const [openTaskDelete, setOpenTaskDelete] = useState(false)
    const [openTaskPersonalEdit, setOpenTaskPersonalEdit] = useState(false)
    const [openTaskPersonalDelete, setOpenTaskPersonalDelete] = useState(false)

    const dispatch = useDispatch()
    const { newTaskColumn, newTask } = useSelector(state => state.form)

    const [confirmTaskEdit] = useMutation(EDIT_TASK, {
        update(proxy, result) {
            const { _id, description, inCharge, columnId, projectId } = result.data.editTask
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER,
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === projectId) {
                        return {
                            ...project, taskColumns: [...project.taskColumns.map(column => {
                                if (column._id === columnId) {
                                    return { ...column, tasks: [ ...column.tasks.map(task => {
                                        if(task._id === _id) {
                                            return { ...task, description, inCharge }
                                        } else {
                                            return { ...task }
                                        }
                                    }) ] }
                                } else {
                                    return { ...column }
                                }
                            })]
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
                setOpenTaskEdit(false)
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "EDIT_TASK", payload: { taskId: _id, columnId, description, inCharge } })
            }
        },
        variables: { taskId, description: newTask.description, inCharge: newTask.inCharge, projectId: newTaskColumn.projectId }
    })

    const [confirmTaskDelete] = useMutation(DELETE_TASK, {
        update(proxy, result) {
            console.log("RESULT", result.data.deleteTask);
            const { _id, projectId } = result.data.deleteTask
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER,
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === projectId) {
                        return {
                            ...project, taskColumns: [...project.taskColumns.map(column => {
                                if (column._id === result.data.deleteTask.columnId) {
                                    return { ...column, tasks: [ ...column.tasks.filter(task => task._id !== _id) ] }
                                } else {
                                    return { ...column }
                                }
                            })]
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
                setOpenTaskDelete(false)
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "DELETE_TASK", payload: { columnId: result.data.deleteTask.columnId, taskId: _id } })
            }
        },
        variables: { taskId, columnId, projectId: newTaskColumn.projectId }
    })

    const [confirmTaskPersonalEdit] = useMutation(EDIT_TASK_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO,
            })
            if (data) {
                const newData = { ...data.myInfo, personalTaskColumns: [ ...data.myInfo.personalTaskColumns.map(column => {
                    if(column._id === result.data.editTaskPersonal.columnId) {
                        return { ...column, tasks: [ ...column.tasks.map(task => {
                            if(task._id === result.data.editTaskPersonal._id) {
                                return { ...task, description: result.data.editTaskPersonal.description }
                            } else {
                                return { ...task }
                            }
                        }) ] }
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
                setOpenTaskPersonalEdit(false)
                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })
                dispatch({ type: "EDIT_TASK_PERSONAL", payload: {
                    taskId: result.data.editTaskPersonal._id,
                    columnId: result.data.editTaskPersonal.columnId,
                    description: result.data.editTaskPersonal.description
                } })
            }
        },
        variables: { taskId, description: newTask.description }
    })

    const [confirmTaskPersonalDelete] = useMutation(DELETE_TASK_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO,
            })
            if (data) {
                const newData = { ...data.myInfo, personalTaskColumns: [ ...data.myInfo.personalTaskColumns.map(column => {
                    if(column._id === result.data.deleteTaskPersonal.columnId) {
                        return { ...column, tasks: [ ...column.tasks.filter(task => task._id !== result.data.deleteTaskPersonal._id) ] }
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
                setOpenTaskPersonalEdit(false)
                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })
                dispatch({ type: "DELETE_TASK_PERSONAL", payload: {
                    taskId: result.data.deleteTaskPersonal._id,
                    columnId: result.data.deleteTaskPersonal.columnId,
                } })
            }
        },
        variables: { taskId, columnId }
    })

    return (
        <>
            <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                    <>

                        <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                        <HiOutlineDotsVertical size={13} className="text-gray-300 cursor-pointer" />
                        </Menu.Button>


                        <MenuItems
                            open={open}
                            setOpenTaskEdit={() => setOpenTaskEdit(true)}
                            setOpenTaskDelete={() => setOpenTaskDelete(true)}
                            setOpenTaskPersonalEdit={() => setOpenTaskPersonalEdit(true)}
                            setOpenTaskPersonalDelete={() => setOpenTaskPersonalDelete(true)}
                        />
                    </>
                )}

            </Menu>

            <ModalComponent
                open={openTaskEdit}
                onClose={() => setOpenTaskEdit(false)}
                cancel={() => setOpenTaskEdit(false)}
                modalTitle="Edit Task"
                confirmButtonText="Confirm"
                confirm={confirmTaskEdit}
            >
                <EditTask
                    description={description}
                    inCharge={inCharge}
                    columnId={columnId}
                />
            </ModalComponent>

            <ModalComponent
                open={openTaskDelete}
                onClose={() => setOpenTaskDelete(false)}
                cancel={() => setOpenTaskDelete(false)}
                modalTitle="Delete Task?"
                confirmButtonText="Delete"
                confirm={confirmTaskDelete}
            >
                <div>
                    <p>Are you sure you want delete chosen task?</p>
                </div>
            </ModalComponent>

            <ModalComponent
                open={openTaskPersonalEdit}
                onClose={() => setOpenTaskPersonalEdit(false)}
                cancel={() => setOpenTaskPersonalEdit(false)}
                modalTitle="Edit Task"
                confirmButtonText="Confirm"
                confirm={confirmTaskPersonalEdit}
            >
                <EditTaskPersonal
                    description={description}
                />
            </ModalComponent>

            <ModalComponent
                open={openTaskPersonalDelete}
                onClose={() => setOpenTaskPersonalDelete(false)}
                cancel={() => setOpenTaskPersonalDelete(false)}
                modalTitle="Delete Task?"
                confirmButtonText="Delete"
                confirm={confirmTaskPersonalDelete}
            >
                <div>
                    <p>Are you sure you want delete chosen task?</p>
                </div>
            </ModalComponent>

        </>
    )
}

export default TaskMenu
