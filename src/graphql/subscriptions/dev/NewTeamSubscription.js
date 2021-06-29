import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { UNVERIFIED_TEAMS } from "../../queries/dev/UnverifiedTeamsQuery";


const NewTeamSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(NEW_TEAM_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: UNVERIFIED_TEAMS,
                });
                if (data) {
                    client.writeQuery({
                        query: UNVERIFIED_TEAMS,
                        data: {
                            unverifiedTeams: [
                                subscriptionData.data.newTeam,
                                ...data.unverifiedTeams,
                            ]
                        }
                    });
                    dispatch({
                        type: "NEW_TEAM_SUBSCRIPTION", payload: { newTeam: subscriptionData.data.newTeam }
                    })
                }
            }
        });

    return null
}



export const NEW_TEAM_SUBSCRIPTION = gql`
  subscription newTeam($userId: ID!) {
    newTeam(userId: $userId) {
        _id
        teamName
        createdBy {
          _id
          name
          photo
        }
        members {
          _id
          name
          photo
        }
    }
  }
`;

export default NewTeamSubscription