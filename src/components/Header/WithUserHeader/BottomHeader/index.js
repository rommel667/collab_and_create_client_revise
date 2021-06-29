import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import BottomLeft from './BottomLeft'
import BottomRight from './BottomRight'
import ModalComponent from '../../../SharedComponents/ModalComponent'
import NewTeam from '../../../Forms/NewTeam'
import { useMutation } from '@apollo/client'
import { NEW_TEAM } from '../../../../graphql/gql/team/mutation'
import { VERIFIED_TEAMS } from '../../../../graphql/queries/dev/VerifiedTeamsQuery'



const BottomHeader = () => {

    const location = useLocation()

    const dispatch = useDispatch()

    const { newTeamForm } = useSelector(state => state.team)

    const [openNewTeamModal, setOpenNewTeamModal] = useState(false)

    const cancelNewTeam = () => {
        setOpenNewTeamModal(false)
        dispatch({ type: "RESET_NEW_TEAM_FORM" })
    }

    const [newTeam, { data: newTeamData, loading: newTeamLoading }] = useMutation(NEW_TEAM, {
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
            teamName: newTeamForm.teamName, members: newTeamForm.members.map(member => member.value)
        },
        onError(err) {
            // setError(err.graphQLErrors[0].message.split(': ')[1]);
            console.log(err);
        }
    })

    const openModalHandler = () => {
        if (location.pathname.split('/')[2] === "teams") {
            setOpenNewTeamModal(true)
        }
    }



    return (
        <div className="flex justify-between items-center">

            <BottomLeft />

            <BottomRight openModalHandler={openModalHandler} />

            <ModalComponent
                open={openNewTeamModal}
                onClose={cancelNewTeam}
                cancel={cancelNewTeam}
                modalTitle="New Team"
                confirmButtonText="Confirm"
                confirm={newTeam}
            >
                <NewTeam />
            </ModalComponent>


        </div>
    )
}

export default BottomHeader