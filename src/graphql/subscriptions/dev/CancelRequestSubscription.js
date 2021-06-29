import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { PENDING_INVITES_RESPOND } from "../../queries/dev/PendingInvitesRespondQuery";

const CancelRequestSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(CANCEL_REQUEST_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: PENDING_INVITES_RESPOND,
                });
                if (data) {
                    client.writeQuery({
                        query: PENDING_INVITES_RESPOND,
                        data: {
                            pendingInvitesRespond: [
                                ...data.pendingInvitesRespond.filter(res => res._id !== subscriptionData.data.cancelRequest._id)
                            ]
                        }
                    });
                    dispatch({
                        type: "CANCEL_REQUEST_SUBSCRIPTION", payload: { cancelForRespond: subscriptionData.data.cancelRequest }
                    })
                }
            }
        });

    return null
}

export const CANCEL_REQUEST_SUBSCRIPTION = gql`
  subscription cancelRequest($userId: ID!) {
    cancelRequest(userId: $userId) {
      _id
    }
  }
`;


export default CancelRequestSubscription