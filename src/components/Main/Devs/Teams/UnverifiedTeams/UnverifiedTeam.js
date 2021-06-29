import { useMutation } from '@apollo/client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ACCEPT_TEAM_INVITE } from '../../../../../graphql/gql/team/mutation'
import { UNVERIFIED_TEAMS } from '../../../../../graphql/queries/dev/UnverifiedTeamsQuery'
import { VERIFIED_TEAMS } from '../../../../../graphql/queries/dev/VerifiedTeamsQuery'

const UnverifiedTeam = ({ team }) => {

    const dispatch = useDispatch()

    const [acceptTeamInvite] = useMutation(ACCEPT_TEAM_INVITE, {
        update(proxy, result) {
            let teamInfo;
            const data = proxy.readQuery({
                query: UNVERIFIED_TEAMS,
            });
            if(data) {
                teamInfo = data.unverifiedTeams.find(team => team._id === result.data.acceptTeamInvite.teamId)
                proxy.writeQuery({
                    query: UNVERIFIED_TEAMS,
                    data: {
                        unverifiedTeams: [
                            ...data.unverifiedTeams.filter(team => team._id !== result.data.acceptTeamInvite.teamId)
                        ]
                    }
                });
            }
            const data2 = proxy.readQuery({
                query: VERIFIED_TEAMS,
            });
            if(data2) {
                proxy.writeQuery({
                    query: VERIFIED_TEAMS,
                    data: {
                        verifiedTeams: [
                            ...data2.verifiedTeams, teamInfo
                        ]
                    }
                });
            }
            dispatch({ type: "ACCEPT_TEAM_INVITE", payload: { teamId: result.data.acceptTeamInvite.teamId } })
        },
        variables: {
            teamId: team._id
        }
    })

    return (
        <div>
            <p>Team Name: {team.teamName}</p>
            <p>Created By: {team.createdBy.name}</p>
            {team.members.map(member => {
                return (
                    <p key={member._id}>{member.name}</p>
                )
            })}
            <button onClick={acceptTeamInvite}>Accept</button>
        </div>
    )
}

export default UnverifiedTeam