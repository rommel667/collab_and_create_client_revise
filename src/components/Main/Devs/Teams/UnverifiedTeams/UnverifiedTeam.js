import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ACCEPT_TEAM_INVITE } from '../../../../../graphql/gql/team/mutation'
import { UNVERIFIED_TEAMS } from '../../../../../graphql/queries/dev/UnverifiedTeamsQuery'
import { VERIFIED_TEAMS } from '../../../../../graphql/queries/dev/VerifiedTeamsQuery'

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
        console.log("Verified", verifiedArray);
        console.log("UNVerified", unverifiedArray);
        setVerifiedMembers(verifiedArray)
        setUnverifiedMembers(unverifiedArray)
    }, [team])

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

    const [rejectTeamInvite] = useMutation(ACCEPT_TEAM_INVITE, {
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

            <div className="flex items-center gap-2">
                <p>Members:</p>
                <div className="flex">
                    {verifiedMembers?.map((member, index) => {
                        if (index === 0) {
                            return (
                                <img
                                    className="h-6 w-6 rounded-full object-cover border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        } else {
                            return (
                                <img
                                    className="h-6 w-6 rounded-full object-cover -ml-2 border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        }
                    })}
                </div>

            </div>

            <div className="flex items-center gap-2">
                <p>Pending:</p>
                <div className="flex">
                    {unverifiedMembers?.map((member, index) => {
                        if (index === 0) {
                            return (
                                <img
                                    className="h-6 w-6 rounded-full object-cover border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        } else {
                            return (
                                <img
                                    className="h-6 w-6 rounded-full object-cover -ml-2 border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        }
                    })}
                </div>

            </div>

          
            <button onClick={acceptTeamInvite}>Accept</button>
            <button onClick={rejectTeamInvite}>Reject</button>
        </div>
    )
}

export default UnverifiedTeam