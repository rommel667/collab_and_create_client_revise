import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import MenuItems from './MenuItems';
import ModalComponent from '../../../SharedComponents/ModalComponent';
import EditTask from '../../../Forms/EditTask';
import { useMutation } from '@apollo/client';
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_TASK, EDIT_TASK } from '../../../../graphql/gql/task/mutation';

const TaskMenu = ({ taskId, description, inCharge, columnId }) => {

    const [openTaskEdit, setOpenTaskEdit] = useState(false)
    const [openTaskDelete, setOpenTaskDelete] = useState(false)

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
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER,
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.deleteTaskColumn.projectId) {
                        return { ...project, taskColumns: [ ...project.taskColumns.filter(col => col._id !== result.data.deleteTaskColumn._id) ] }
                    } else {
                        return { ...project }
                    }
                })
                console.log("NEW DATA", newData);
                proxy.writeQuery({
                    query: PROJECTS_BY_USER,
                    data: {
                        projectsByUser: [...newData]
                    }
                })
                setOpenTaskDelete(false)
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "DELETE_TASK", payload: { columnId: result.data.deleteTaskColumn._id } })
            }
        },
        variables: { taskId, columnId, projectId: newTaskColumn.projectId }
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

        </>
    )
}

export default TaskMenu
