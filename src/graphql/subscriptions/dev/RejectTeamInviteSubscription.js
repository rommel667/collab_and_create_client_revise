import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { VERIFIED_TEAMS } from "../../queries/dev/VerifiedTeamsQuery";
import { UNVERIFIED_TEAMS } from "../../queries/dev/UnverifiedTeamsQuery";


const RejectTeamInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()
    const { verifiedTeams, unverifiedTeams } = useSelector(state => state.team)

    const { data } = useSubscription(REJECT_TEAM_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                if(verifiedTeams.some(team => team._id === subscriptionData.data.rejectTeamInvite.teamId)) {
                    const data = client.readQuery({
                        query: VERIFIED_TEAMS,
                    });
                    if (data) {
                        const targetTeam = data.verifiedTeams.find(team => team._id === subscriptionData.data.rejectTeamInvite.teamId)
                        const updateTeamMembers = targetTeam.members.filter(member => member._id !== subscriptionData.data.rejectTeamInvite.user._id)
                        const newData = data.verifiedTeams.map(team => {
                            if(team._id === subscriptionData.data.rejectTeamInvite.teamId) {
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
                            type: "REJECT_TEAM_INVITE_SUBSCRIPTION_UPDATE_VERIFIED", payload: { verifiedTeams: newData }
                        })
                    }  
                }
                if(unverifiedTeams.some(team => team._id === subscriptionData.data.rejectTeamInvite.teamId)) {
                    const data = client.readQuery({
                        query: UNVERIFIED_TEAMS,
                    });
                    if (data) {
                        const targetTeam = data.unverifiedTeams.find(team => team._id === subscriptionData.data.rejectTeamInvite.teamId)
                        const updateTeamMembers = targetTeam.members.filter(member => member._id !== subscriptionData.data.rejectTeamInvite.user._id)
                        const newData = data.unverifiedTeams.map(team => {
                            if(team._id === subscriptionData.data.rejectTeamInvite.teamId) {
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
                            type: "REJECT_TEAM_INVITE_SUBSCRIPTION_UPDATE_UNVERIFIED", payload: { unverifiedTeams: newData }
                        })
                    }  
                }
                
                
            }
        });

    return null
}

export const REJECT_TEAM_INVITE_SUBSCRIPTION = gql`
  subscription rejectTeamInvite($userId: ID!) {
    rejectTeamInvite(userId: $userId) {
        teamId
        user {
            _id
        }
    }
  }
`;


export default RejectTeamInviteSubscription