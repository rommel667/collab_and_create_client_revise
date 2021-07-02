import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { VERIFIED_TEAMS } from "../../queries/dev/VerifiedTeamsQuery";
import { UNVERIFIED_TEAMS } from "../../queries/dev/UnverifiedTeamsQuery";


const AcceptTeamInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()
    const { verifiedTeams, unverifiedTeams } = useSelector(state => state.team)

    const { data } = useSubscription(ACCEPT_TEAM_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                console.log("ATIS", subscriptionData.data.acceptTeamInvite);
                if(verifiedTeams.some(team => team._id === subscriptionData.data.acceptTeamInvite.teamId)) {
                    const data = client.readQuery({
                        query: VERIFIED_TEAMS,
                    });
                    if (data) {
                        const targetTeam = data.verifiedTeams.find(team => team._id === subscriptionData.data.acceptTeamInvite.teamId)
                        const updateTeamMembers = targetTeam.members.map(member => {
                            if(member._id === subscriptionData.data.acceptTeamInvite.user._id) {
                                return {
                                    ...member,
                                    verifiedTeams: subscriptionData.data.acceptTeamInvite.user.verifiedTeams,
                                    unverifiedTeams: subscriptionData.data.acceptTeamInvite.user.unverifiedTeams,
                                }
                            } else {
                                return {
                                    ...member
                                }
                            }
                        })
                        const newData = data.verifiedTeams.map(team => {
                            if(team._id === subscriptionData.data.acceptTeamInvite.teamId) {
                                return { ...targetTeam, members: updateTeamMembers }
                            } else {
                                return { ...team }
                            }
                        })
                        client.writeQuery({
                            query: VERIFIED_TEAMS,
                            data: {
                                verifiedTeams: [ ...newData ]
                            }
                        });
                        dispatch({
                            type: "ACCEPT_TEAM_INVITE_SUBSCRIPTION_UPDATE_VERIFIED", payload: { verifiedTeams: newData }
                        })
                    }  
                }
                if(unverifiedTeams.some(team => team._id === subscriptionData.data.acceptTeamInvite.teamId)) {
                    const data = client.readQuery({
                        query: UNVERIFIED_TEAMS,
                    });
                    if (data) {
                        const targetTeam = data.unverifiedTeams.find(team => team._id === subscriptionData.data.acceptTeamInvite.teamId)
                        const updateTeamMembers = targetTeam.members.map(member => {
                            if(member._id === subscriptionData.data.acceptTeamInvite.user._id) {
                                return {
                                    ...member,
                                    verifiedTeams: subscriptionData.data.acceptTeamInvite.user.verifiedTeams,
                                    unverifiedTeams: subscriptionData.data.acceptTeamInvite.user.unverifiedTeams,
                                } 
                            } else {
                                return { ...member }
                            }
                        })
                        const newData = data.unverifiedTeams.map(team => {
                            if(team._id === subscriptionData.data.acceptTeamInvite.teamId) {
                                return { ...targetTeam, members: updateTeamMembers }
                            } else {
                                return { ...team }
                            }
                        })
                      
                        client.writeQuery({
                            query: UNVERIFIED_TEAMS,
                            data: {
                                verifiedTeams: [ ...newData ]
                            }
                        });
                        dispatch({
                            type: "ACCEPT_TEAM_INVITE_SUBSCRIPTION_UPDATE_UNVERIFIED", payload: { unverifiedTeams: newData }
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


export default AcceptTeamInviteSubscription