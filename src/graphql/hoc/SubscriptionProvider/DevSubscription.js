import { useSubscription } from '@apollo/client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_COLLEAGUES, FETCH_PENDING_INVITES_REQUEST, FETCH_PENDING_INVITES_RESPOND } from '../../gql/dev/query';
import { ACCEPT_INVITE_SUBSCRIPTION, CANCEL_REQUEST_SUBSCRIPTION, REJECT_INVITE_SUBSCRIPTION, SEND_INVITE_SUBSCRIPTION } from '../../gql/dev/subscription';

const DevSubscription = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const { data: sendInviteData } = useSubscription(SEND_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: FETCH_PENDING_INVITES_RESPOND,
                });
                if (data) {
                    console.log("SEND_INVITE_SUBSCRIPTION", subscriptionData.data.sendInvite);
                    client.writeQuery({
                        query: FETCH_PENDING_INVITES_RESPOND,
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

    const { data: cancelRequestData } = useSubscription(CANCEL_REQUEST_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: FETCH_PENDING_INVITES_RESPOND,
                });
                if (data) {
                    console.log("CANCEL_REQUEST_SUBSCRIPTION", subscriptionData.data.cancelRequest);
                    client.writeQuery({
                        query: FETCH_PENDING_INVITES_RESPOND,
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

    const { data: acceptInvitetData } = useSubscription(ACCEPT_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data1 = client.readQuery({
                    query: FETCH_PENDING_INVITES_REQUEST,
                });
                const data2 = client.readQuery({
                    query: FETCH_COLLEAGUES,
                });
                if (data1) {
                    client.writeQuery({
                        query: FETCH_PENDING_INVITES_REQUEST,
                        data: {
                            pendingInvitesRequest: [
                                ...data1.pendingInvitesRequest.filter(req => req._id !== subscriptionData.data.acceptInvite._id)
                            ]
                        }
                    });
                }
                if (data2) {
                    client.writeQuery({
                        query: FETCH_COLLEAGUES,
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

    const { data: rejectInvitetData } = useSubscription(REJECT_INVITE_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: FETCH_PENDING_INVITES_REQUEST,
                });
                
                if (data) {
                    client.writeQuery({
                        query: FETCH_PENDING_INVITES_REQUEST,
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

export default DevSubscription