import { useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from 'graphql-tag'
import { PENDING_INVITES_RESPOND } from "../../queries/dev/PendingInvitesRespondQuery";

const SendInviteSubscription = ({ user }) => {

    const dispatch = useDispatch()

    const { data } = useSubscription(SEND_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: PENDING_INVITES_RESPOND,
                });
                if (data) {
                    console.log("SEND_INVITE_SUBSCRIPTION", subscriptionData.data.sendInvite);
                    client.writeQuery({
                        query: PENDING_INVITES_RESPOND,
                        data: {
                            pendingInvitesRespond: [
                                ...data.pendingInvitesRespond,
                                subscriptionData.data.sendInvite
                            ]
                        }
                    });
                    dispatch({
                        type: "SEND_INVITE_SUBSCRIPTION", payload: { newForRespond: subscriptionData.data.sendInvite }
                    })
                }
            }
        });

    return null
}



export const SEND_INVITE_SUBSCRIPTION = gql`
  subscription sendInvite($userId: ID!) {
    sendInvite(userId: $userId) {
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

export default SendInviteSubscription