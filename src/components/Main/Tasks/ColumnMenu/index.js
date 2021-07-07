import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { FaEllipsisV } from "react-icons/fa";
import MenuItems from './MenuItems';
import ModalComponent from '../../../SharedComponents/ModalComponent';
import EditTaskColumn from '../../../Forms/EditTaskColumn';
import { useMutation } from '@apollo/client';
import { DELETE_TASK_COLUMN, EDIT_TASK_COLUMN } from '../../../../graphql/gql/task/mutation';
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery';
import { useDispatch, useSelector } from 'react-redux';

const ColumnMenu = ({ columnName, columnId }) => {

    const [openTaskColumnEdit, setOpenTaskColumnEdit] = useState(false)
    const [openTaskColumnDelete, setOpenTaskColumnDelete] = useState(false)

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

        </>
    )
}

export default ColumnMenu
