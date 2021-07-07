import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { COLLEAGUES } from "../../queries/dev/ColleaguesQuery";
import { PENDING_INVITES_REQUEST } from "../../queries/dev/PendingInvitesRequestQuery";
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";
import { FETCH_PROJECT_INVITES } from "../../gql/notification/query";

const NewProjectInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(NEW_PROJECT_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const projectInvites = client.readQuery({
                    query: FETCH_PROJECT_INVITES,
                });
                if (projectInvites) {
                    const newData = [ subscriptionData.data.newProject, projectInvites.unconfirmProjectInvites ] 
                    client.writeQuery({
                        query: FETCH_PROJECT_INVITES,
                        data: {
                            unconfirmProjectInvites: [ ...newData ]
                        }
                    });
                    dispatch({
                        type: "NEW_PROJECT_INVITE_SUBSCRIPTION", payload: { newProjectInvite: subscriptionData.data.newProject }
                    })
                }
            }
        });

    return null
}



export const NEW_PROJECT_INVITE_SUBSCRIPTION = gql`
  subscription newProject($userId: ID!) {
    newProject(userId: $userId) {
        _id
        projectName
        description
        techStacks
        createdBy {
          _id
          email
          name
          photo
        }
        createdAt
        updatedAt
    }
  }
`;

export default NewProjectInviteSubscription