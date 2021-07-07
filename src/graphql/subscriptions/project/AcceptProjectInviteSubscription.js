import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { COLLEAGUES } from "../../queries/dev/ColleaguesQuery";
import { PENDING_INVITES_REQUEST } from "../../queries/dev/PendingInvitesRequestQuery";
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const AcceptProjectInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(ACCEPT_PROJECT_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const projects = client.readQuery({
                    query: PROJECTS_BY_USER,
                });
                if (projects) {
                    const newData = projects.projectsByUser.map(project => {
                        if(project._id === subscriptionData.data.acceptProjectInvite._id ) {
                            return { ...project, confirmedMembers: [ ...subscriptionData.data.acceptProjectInvite.confirmedMembers ] }
                        } else {
                            return { ...project }
                        }
                    })
                    client.writeQuery({
                        query: PROJECTS_BY_USER,
                        data: {
                            projectsByUser: [ ...newData ]
                        }
                    });
                    dispatch({
                        type: "ACCEPT_PROJECT_INVITE_SUBSCRIPTION", payload: { projects: newData }
                    })
                }
            }
        });

    return null
}



export const ACCEPT_PROJECT_INVITE_SUBSCRIPTION = gql`
  subscription acceptProjectInvite($userId: ID!) {
    acceptProjectInvite(userId: $userId) {
        _id
        confirmedMembers {
          _id
          name
          email
          photo
        }
    }
  }
`;

export default AcceptProjectInviteSubscription