import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ACCEPT_TEAM_INVITE, REJECT_TEAM_INVITE } from '../../../../../graphql/gql/team/mutation'
import { UNVERIFIED_TEAMS } from '../../../../../graphql/queries/dev/UnverifiedTeamsQuery'
import { VERIFIED_TEAMS } from '../../../../../graphql/queries/dev/VerifiedTeamsQuery'
import MembersStatus from '../Shared/MembersStatus'

const UnverifiedTeam = ({ team }) => {

    const dispatch = useDispatch()

    const [verifiedMembers, setVerifiedMembers] = useState(null)
    const [unverifiedMembers, setUnverifiedMembers] = useState(null)

    useEffect(() => {
        const verifiedArray = []
        const unverifiedArray = []
        team.members.map(member => {
            if (member.verifiedTeams.some(t => t._id === team._id)) {
                verifiedArray.push(member)
            } else {
                unverifiedArray.push(member)
            }
            return null
        })
        setVerifiedMembers(verifiedArray)
        setUnverifiedMembers(unverifiedArray)
    }, [team])

    const [acceptTeamInvite] = useMutation(ACCEPT_TEAM_INVITE, {
        update(proxy, result) {
            let teamInfo;
            const data = proxy.readQuery({
                query: UNVERIFIED_TEAMS,
            });
            if (data) {
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
            if (data2) {
                const updateTeamInfo = teamInfo.members.map(member => {
                    if (member._id === result.data.acceptTeamInvite.user._id) {
                        return {
                            ...member,
                            verifiedTeams: [...result.data.acceptTeamInvite.user.verifiedTeams],
                            unverifiedTeams: [...result.data.acceptTeamInvite.user.unverifiedTeams]
                        }
                    } else {
                        return { ...member }
                    }
                })
                proxy.writeQuery({
                    query: VERIFIED_TEAMS,
                    data: {
                        verifiedTeams: [
                            ...data2.verifiedTeams, { ...teamInfo, members: [...updateTeamInfo] }
                        ]
                    }
                });
                dispatch({ type: "ACCEPT_TEAM_INVITE", payload: { teamInfo: { ...teamInfo, members: [...updateTeamInfo] } } })
            }

        },
        variables: {
            teamId: team._id
        }
    })

    const [rejectTeamInvite] = useMutation(REJECT_TEAM_INVITE, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: UNVERIFIED_TEAMS,
            });
            if (data) {
                proxy.writeQuery({
                    query: UNVERIFIED_TEAMS,
                    data: {
                        unverifiedTeams: [
                            ...data.unverifiedTeams.filter(team => team._id !== result.data.rejectTeamInvite.teamId)
                        ]
                    }
                });
                dispatch({ type: "REJECT_TEAM_INVITE", payload: { teamId: result.data.rejectTeamInvite.teamId } })
            }
        },
        variables: {
            teamId: team._id
        }
    })

    return (
        <div className="p-2 shadow-md rounded-md">
            <p className="text-base font-semibold">{team.teamName}</p>
            <p className="text-xs">Created by: {team.createdBy.name}</p>

            <div className="flex justify-between">
                <MembersStatus categoryText="Members" members={verifiedMembers} />
                <MembersStatus categoryText="Pending" members={unverifiedMembers} />
            </div>



            <div className="flex items-center mt-3">
                <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={acceptTeamInvite}>Accept</button>
                <button className="bg-red-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={rejectTeamInvite}>Reject</button>
            </div>

        </div>
    )
}

export default UnverifiedTeam