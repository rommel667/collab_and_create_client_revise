import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import BottomLeft from './BottomLeft'
import BottomRight from './BottomRight'
import ModalComponent from '../../../SharedComponents/ModalComponent'
import NewTeam from '../../../Forms/NewTeam'
import NewProject from '../../../Forms/NewProject'
import NewTaskColumn from '../../../Forms/NewTaskColumn'
import { useMutation } from '@apollo/client'
import { NEW_TEAM } from '../../../../graphql/gql/team/mutation'
import { VERIFIED_TEAMS } from '../../../../graphql/queries/dev/VerifiedTeamsQuery'
import { NEW_PROJECT } from '../../../../graphql/gql/project/mutation'
import { NEW_TASK_COLUMN } from '../../../../graphql/gql/task/mutation'
import { PROJECTS_BY_USER } from '../../../../graphql/queries/project/ProjectsByUserQuery'




const BottomHeader = () => {

    const location = useLocation()

    const dispatch = useDispatch()

    const { newTeam, newProject, newTaskColumn } = useSelector(state => state.form)
    
    const [openNewTeamModal, setOpenNewTeamModal] = useState(false)
    const [openNewProjectModal, setOpenNewProjectModal] = useState(false)
    const [openNewTaskColumnModal, setOpenNewTaskColumnModal] = useState(false)

    const cancelNewTeam = () => {
        setOpenNewTeamModal(false)
        dispatch({ type: "RESET_FORM" })
    }

    const cancelNewProject = () => {
        setOpenNewProjectModal(false)
        dispatch({ type: "RESET_FORM" })
    }

    const cancelNewTaskColumn = () => {
        setOpenNewTaskColumnModal(false)
        dispatch({ type: "RESET_FORM" })
    }

    const [confirmNewTeam] = useMutation(NEW_TEAM, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: VERIFIED_TEAMS,
            })
            if (data) {
                proxy.writeQuery({
                    query: VERIFIED_TEAMS,
                    data: {
                        verifiedTeams: [
                            result.data.newTeam, ...data.verifiedTeams
                        ]
                    }
                });
                cancelNewTeam()
                dispatch({ type: "NEW_TEAM", payload: { newTeam: result.data.newTeam } })
            }
        },
        variables: {
            teamName: newTeam.teamName, members: newTeam.members.map(member => member.value)
        },
        onError(err) {
            // setError(err.graphQLErrors[0].message.split(': ')[1]);
            console.log(err);
        }
    })

    const [confirmNewProject] = useMutation(NEW_PROJECT, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER
            })
            if (data) {
                proxy.writeQuery({
                    query: PROJECTS_BY_USER,
                    data: {
                        projectsByUser: [...data.projectsByUser, result.data.newProject]
                    }
                })
            }
            cancelNewProject()
            dispatch({ type: "NEW_PROJECT", payload: { newProject: result.data.newProject } })
        },
        variables: {
            ...newProject,
            unconfirmMembers: newProject.unconfirmMembers.map(member => member.value),
            techStacks: newProject.techStacks.map(stack => stack.value),
        }
    })

    const [confirmNewTaskColumn] = useMutation(NEW_TASK_COLUMN, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER,
            })
            if (data) {
                const newData = data.projectsByUser.map(project => {
                    if (project._id === result.data.newTaskColumn.projectId) {
                        return { ...project, taskColumns: [...project.taskColumns, result.data.newTaskColumn] }
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
                cancelNewTaskColumn()
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "NEW_TASK_COLUMN", payload: { newTaskColumn: result.data.newTaskColumn } })
            }
        },
        variables: { ...newTaskColumn }
    })



    return (
        <div className="flex justify-between items-center">

            <BottomLeft />

            <BottomRight
                setOpenNewTeamModal={() => setOpenNewTeamModal(true)}
                setOpenNewProjectModal={() => setOpenNewProjectModal(true)}
                setOpenNewTaskColumnModal={() => setOpenNewTaskColumnModal(true)}
            />

            <ModalComponent
                open={openNewTeamModal}
                onClose={cancelNewTeam}
                cancel={cancelNewTeam}
                modalTitle="New Team"
                confirmButtonText="Confirm"
                confirm={confirmNewTeam}
            >
                <NewTeam />
            </ModalComponent>

            <ModalComponent
                open={openNewProjectModal}
                onClose={cancelNewProject}
                cancel={cancelNewProject}
                modalTitle="New Project"
                confirmButtonText="Confirm"
                confirm={confirmNewProject}
            >
                <NewProject />
            </ModalComponent>

            <ModalComponent
                open={openNewTaskColumnModal}
                onClose={cancelNewTaskColumn}
                cancel={cancelNewTaskColumn}
                modalTitle="New Column"
                confirmButtonText="Confirm"
                confirm={confirmNewTaskColumn}
            >
                <NewTaskColumn />
            </ModalComponent>

        </div>
    )
}

export default BottomHeader