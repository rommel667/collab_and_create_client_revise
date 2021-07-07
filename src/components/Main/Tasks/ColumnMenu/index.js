import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { FaEllipsisV } from "react-icons/fa";
import MenuItems from './MenuItems';
import ModalComponent from '../../../SharedComponents/ModalComponent';
import EditTaskColumn from '../../../Forms/EditTaskColumn';
import { useMutation } from '@apollo/client';
import { EDIT_TASK_COLUMN } from '../../../../graphql/gql/task/mutation';
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery';
import { useDispatch, useSelector } from 'react-redux';

const ColumnMenu = ({ columnName, columnId }) => {

    const [openTaskColumnEdit, setOpenTaskColumnEdit] = useState(false)

    const dispatch = useDispatch()
    const { newTaskColumn } = useSelector(state => state.form)

    const [confirmTaskColumnEdit] = useMutation(EDIT_TASK_COLUMN, {
        update(proxy, result) {
            console.log("RESULT",result.data.editTaskColumn);
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER,
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.editTaskColumn.projectId) {
                        return { ...project, taskColumns: [ ...project.taskColumns.map(column => {
                            if(column._id === result.data.editTaskColumn._id) {
                                return { ...column, columnName: result.data.editTaskColumn.columnName }
                            } else {
                                return { ...column }
                            }
                        }) ] }
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

    return (
        <>
            <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                    <>

                        <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                            <FaEllipsisV size={15} className="cursor-pointer" />
                        </Menu.Button>


                        <MenuItems open={open} setOpenTaskColumnEdit={() => setOpenTaskColumnEdit(true)} />
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

        </>
    )
}

export default ColumnMenu
