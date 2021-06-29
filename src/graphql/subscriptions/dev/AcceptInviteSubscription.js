import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { COLLEAGUES } from "../../queries/dev/ColleaguesQuery";
import { PENDING_INVITES_REQUEST } from "../../queries/dev/PendingInvitesRequestQuery";

const AcceptInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(ACCEPT_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data1 = client.readQuery({
                    query: PENDING_INVITES_REQUEST,
                });
                const data2 = client.readQuery({
                    query: COLLEAGUES,
                });
                if (data1) {
                    client.writeQuery({
                        query: PENDING_INVITES_REQUEST,
                        data: {
                            pendingInvitesRequest: [
                                ...data1.pendingInvitesRequest.filter(req => req._id !== subscriptionData.data.acceptInvite._id)
                            ]
                        }
                    });
                }
                if (data2) {
                    client.writeQuery({
                        query: COLLEAGUES,
                        data: {
                            colleagues: [
                                subscriptionData.data.acceptInvite,
                                ...data2.colleagues,
                            ]
                        }
                    });
                    dispatch({
                        type: "ACCEPT_INVITE_SUBSCRIPTION", payload: { acceptInvite: subscriptionData.data.acceptInvite }
                    })
                }
            }
        });

    return null
}



export const ACCEPT_INVITE_SUBSCRIPTION = gql`
  subscription acceptInvite($userId: ID!) {
    acceptInvite(userId: $userId) {
      _id
      name
      email
      photo
      colleagues {
        _id
        photo
      }
    }
  }
`;

export default AcceptInviteSubscription