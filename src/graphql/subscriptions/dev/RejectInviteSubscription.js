import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { PENDING_INVITES_REQUEST } from "../../queries/dev/PendingInvitesRequestQuery";

const RejectInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(REJECT_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: PENDING_INVITES_REQUEST,
                });
                
                if (data) {
                    client.writeQuery({
                        query: PENDING_INVITES_REQUEST,
                        data: {
                            pendingInvitesRequest: [
                                ...data.pendingInvitesRequest.filter(req => req._id !== subscriptionData.data.rejectInvite._id)
                            ]
                        }
                    });
                    dispatch({
                        type: "REJECT_INVITE_SUBSCRIPTION", payload: { rejectInvite: subscriptionData.data.rejectInvite }
                    })
                }
                
            }
        });

    return null
}

export const REJECT_INVITE_SUBSCRIPTION = gql`
  subscription rejectInvite($userId: ID!) {
    rejectInvite(userId: $userId) {
      _id
      name
      email
      photo
    }
  }
`;


export default RejectInviteSubscription