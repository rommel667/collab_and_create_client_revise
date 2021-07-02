import React from 'react'
import SendInviteSubscription from '../../subscriptions/dev/SendInviteSubscription'
import AcceptInviteSubscription from '../../subscriptions/dev/AcceptInviteSubscription'
import CancelRequestSubscription from '../../subscriptions/dev/CancelRequestSubscription'
import RejectInviteSubscription from '../../subscriptions/dev/RejectInviteSubscription'
import NewTeamSubscription from '../../subscriptions/dev/NewTeamSubscription'
import AcceptTeamInviteSubscription from '../../subscriptions/dev/AcceptTeamInviteSubscription'
import RejectTeamInviteSubscription from '../../subscriptions/dev/RejectTeamInviteSubscription'
import { useSelector } from 'react-redux'


const SubscriptionProvider = () => {

    const { user } = useSelector(state => state.user)

    return (
        <>
            <SendInviteSubscription user={user} />
            <CancelRequestSubscription user={user} />
            <AcceptInviteSubscription user={user} />
            <RejectInviteSubscription user={user} />
            <AcceptTeamInviteSubscription user={user} />
            <RejectTeamInviteSubscription user={user} />
            <NewTeamSubscription user={user} />
        </>
    )
}

export default SubscriptionProvider