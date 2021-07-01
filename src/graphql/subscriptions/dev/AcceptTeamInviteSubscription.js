import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PENDING_INVITES_REQUEST } from "../../queries/dev/PendingInvitesRequestQuery";
import { VERIFIED_TEAMS } from "../../queries/dev/VerifiedTeamsQuery";
import { UNVERIFIED_TEAMS } from "../../queries/dev/UnverifiedTeamsQuery";


const RejectInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()
    const { verifiedTeams, unverifiedTeams } = useSelector(state => state.team)

    const { data } = useSubscription(ACCEPT_TEAM_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                if(verifiedTeams.some(team => team._id === subscriptionData.data.acceptNewInvite.teamId)) {
                    const data = client.readQuery({
                        query: VERIFIED_TEAMS,
                    });
                    if (data) {
                        const filteredTeam = data.verifiedTeams.filter(team => team._id !== subscriptionData.data.acceptNewInvite.teamId)
                        const targetTeam = data.verifiedTeams.find(team => team._id === subscriptionData.data.acceptNewInvite.teamId)
                        const updateTeam = targetTeam.members.map(member => {
                            if(member._id === subscriptionData.data.acceptNewInvite.user._id) {
                                return {
                                    ...member,
                                    verifiedTeams: subscriptionData.data.acceptNewInvite.user.verifiedTeams,
                                    unverifiedTeams: subscriptionData.data.acceptNewInvite.user.unverifiedTeams,
                                }
                            } else {
                                return {
                                    ...member
                                }
                            }
                        })
                        const newData = [ updateTeam, ...filteredTeam ]
                        client.writeQuery({
                            query: VERIFIED_TEAMS,
                            data: {
                                verifiedTeams: [ ...newData ]
                            }
                        });
                        dispatch({
                            type: "ACCEPT_TEAM_INVITE_SUBSCRIPTION", payload: { updateVerified: newData }
                        })
                    }  
                }
                if(unverifiedTeams.some(team => team._id === subscriptionData.data.acceptNewInvite.teamId)) {
                    const data = client.readQuery({
                        query: UNVERIFIED_TEAMS,
                    });
                    if (data) {
                        const filteredTeam = data.verifiedTeams.filter(team => team._id !== subscriptionData.data.acceptNewInvite.teamId)
                        const targetTeam = data.verifiedTeams.find(team => team._id === subscriptionData.data.acceptNewInvite.teamId)
                        const updateTeam = targetTeam.members.map(member => {
                            if(member._id === subscriptionData.data.acceptNewInvite.user._id) {
                                return {
                                    ...member,
                                    verifiedTeams: subscriptionData.data.acceptNewInvite.user.verifiedTeams,
                                    unverifiedTeams: subscriptionData.data.acceptNewInvite.user.unverifiedTeams,
                                } 
                            } else {
                                return { ...member }
                            }
                        })
                        const newData = [ updateTeam, ...filteredTeam ]
                        client.writeQuery({
                            query: UNVERIFIED_TEAMS,
                            data: {
                                verifiedTeams: [ ...newData ]
                            }
                        });
                        dispatch({
                            type: "ACCEPT_TEAM_INVITE_SUBSCRIPTION", payload: { updateUnverified: newData }
                        })
                    }  
                }
                
                
            }
        });

    return null
}

export const ACCEPT_TEAM_INVITE_SUBSCRIPTION = gql`
  subscription acceptTeamInvite($userId: ID!) {
    acceptTeamInvite(userId: $userId) {
        teamId
        user {
            _id
            name
            photo
            verifiedTeams {
                _id
            }
            unverifiedTeams {
                _id
            }
        }
    }
  }
`;


export default RejectInviteSubscription