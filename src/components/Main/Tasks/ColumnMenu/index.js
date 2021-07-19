import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { FaEllipsisV } from "react-icons/fa";
import MenuItems from './MenuItems';
import ModalComponent from '../../../SharedComponents/ModalComponent';
import EditTaskColumn from '../../../Forms/EditTaskColumn';
import { useMutation } from '@apollo/client';
import { DELETE_TASK_COLUMN, DELETE_TASK_COLUMN_PERSONAL, EDIT_TASK_COLUMN, EDIT_TASK_COLUMN_PERSONAL } from '../../../../graphql/gql/task/mutation';
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery';
import { useDispatch, useSelector } from 'react-redux';
import { MY_INFO } from '../../../../graphql/queries/user/MyInfoQuery';

const ColumnMenu = ({ columnName, columnId }) => {

    const [openTaskColumnEdit, setOpenTaskColumnEdit] = useState(false)
    const [openTaskColumnDelete, setOpenTaskColumnDelete] = useState(false)
    const [openTaskColumnPersonalEdit, setOpenTaskColumnPersonalEdit] = useState(false)
    const [openTaskColumnPersonalDelete, setOpenTaskColumnPersonalDelete] = useState(false)

    const dispatch = useDispatch()
    const { newTaskColumn } = useSelector(state => state.form)

    const [confirmTaskColumnEdit] = useMutation(EDIT_TASK_COLUMN, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER,
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.editTaskColumn.projectId) {
                        return {
                            ...project, taskColumns: [...project.taskColumns.map(column => {
                                if (column._id === result.data.editTaskColumn._id) {
                                    return { ...column, columnName: result.data.editTaskColumn.columnName }
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
                setOpenTaskColumnEdit(false)
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "EDIT_TASK_COLUMN", payload: { columnId: result.data.editTaskColumn._id, columnName: result.data.editTaskColumn.columnName } })
            }
        },
        variables: { ...newTaskColumn, columnId }
    })

    const [confirmTaskColumnDelete] = useMutation(DELETE_TASK_COLUMN, {
        update(proxy, result) {
            console.log("RESULT",result.data.deleteTaskColumn);
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
                setOpenTaskColumnDelete(false)
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "DELETE_TASK_COLUMN", payload: { columnId: result.data.deleteTaskColumn._id } })
            }
        },
        variables: { projectId: newTaskColumn.projectId, columnId }
    })

    const [confirmTaskColumnPersonalEdit] = useMutation(EDIT_TASK_COLUMN_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO,
            })
            if (data) {
                const newData = { ...data.myInfo, personalTaskColumns: [ ...data.myInfo.personalTaskColumns.map(column => {
                    if(column._id === result.data.editTaskColumnPersonal._id) {
                        return { ...column, columnName: result.data.editTaskColumnPersonal.columnName }
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
                setOpenTaskColumnPersonalEdit(false)
                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })
                dispatch({ type: "EDIT_TASK_COLUMN_PERSONAL", payload: { columnId: result.data.editTaskColumnPersonal._id, columnName: result.data.editTaskColumnPersonal.columnName } })
            }
        },
        variables: { columnId, columnName: newTaskColumn.columnName  }
    })

    const [confirmTaskColumnPersonalDelete] = useMutation(DELETE_TASK_COLUMN_PERSONAL, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: MY_INFO,
            })
            if (data) {
                const newData = { ...data.myInfo, personalTaskColumns: [
                    ...data.myInfo.personalTaskColumns.filter(column => column._id !== result.data.deleteTaskColumnPersonal._id)
                ] } 
                proxy.writeQuery({
                    query: MY_INFO,
                    data: {
                        myInfo: { ...newData }
                    }
                })
                setOpenTaskColumnPersonalDelete(false)
                dispatch({ type: "MY_INFO", payload: { myInfo: { ...newData } } })
                dispatch({ type: "DELETE_TASK_COLUMN_PERSONAL", payload: { columnId: result.data.deleteTaskColumnPersonal._id } })
            }
        },
        variables: { columnId, columnName: newTaskColumn.columnName  }
    })

    return (
        <>
            <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                    <>

                        <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                            <FaEllipsisV size={15} className="cursor-pointer" />
                        </Menu.Button>


                        <MenuItems
                            open={open}
                            setOpenTaskColumnEdit={() => setOpenTaskColumnEdit(true)}
                            setOpenTaskColumnDelete={() => setOpenTaskColumnDelete(true)}
                            setOpenTaskColumnPersonalEdit={() => setOpenTaskColumnPersonalEdit(true)}
                            setOpenTaskColumnPersonalDelete={() => setOpenTaskColumnPersonalDelete(true)}
                        />
                    </>
                )}

            </Menu>

            <ModalComponent
                open={openTaskColumnEdit}
                onClose={() => setOpenTaskColumnEdit(false)}
                cancel={() => setOpenTaskColumnEdit(false)}
                modalTitle="Edit Task Column"
                confirmButtonText="Confirm"
                confirm={confirmTaskColumnEdit}
            >
                <EditTaskColumn columnName={columnName} />
            </ModalComponent>

            <ModalComponent
                open={openTaskColumnDelete}
                onClose={() => setOpenTaskColumnDelete(false)}
                cancel={() => setOpenTaskColumnDelete(false)}
                modalTitle="Delete Task Column?"
                confirmButtonText="Delete"
                confirm={confirmTaskColumnDelete}
            >
                <div>
                    <p>Are you sure you want to delete column and its associated task?</p>
                </div>
            </ModalComponent>

            <ModalComponent
                open={openTaskColumnPersonalEdit}
                onClose={() => setOpenTaskColumnPersonalEdit(false)}
                cancel={() => setOpenTaskColumnPersonalEdit(false)}
                modalTitle="Edit Task Column"
                confirmButtonText="Confirm"
                confirm={confirmTaskColumnPersonalEdit}
            >
                <EditTaskColumn columnName={columnName} />
            </ModalComponent>

            <ModalComponent
                open={openTaskColumnPersonalDelete}
                onClose={() => setOpenTaskColumnPersonalDelete(false)}
                cancel={() => setOpenTaskColumnPersonalDelete(false)}
                modalTitle="Delete Task Column?"
                confirmButtonText="Delete"
                confirm={confirmTaskColumnPersonalDelete}
            >
                <div>
                    <p>Are you sure you want to delete column and its associated task?</p>
                </div>
            </ModalComponent>

        </>
    )
}

export default ColumnMenu
