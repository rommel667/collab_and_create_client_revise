import React from 'react'
import SendInviteSubscription from '../../subscriptions/dev/SendInviteSubscription'
import AcceptInviteSubscription from '../../subscriptions/dev/AcceptInviteSubscription'
import CancelRequestSubscription from '../../subscriptions/dev/CancelRequestSubscription'
import RejectInviteSubscription from '../../subscriptions/dev/RejectInviteSubscription'
import NewTeamSubscription from '../../subscriptions/dev/NewTeamSubscription'
import AcceptTeamInviteSubscription from '../../subscriptions/dev/AcceptTeamInviteSubscription'
import RejectTeamInviteSubscription from '../../subscriptions/dev/RejectTeamInviteSubscription'
import AcceptProjectInviteSubscription from '../../subscriptions/project/AcceptProjectInviteSubscription'
import NewProjectInviteSubscription from '../../subscriptions/project/NewProjectInviteSubscription'
import NewTaskColumnSubscription from '../../subscriptions/task/NewTaskColumnSubscription'
import NewTaskSubscription from '../../subscriptions/task/NewTaskSubscription'
import MoveTaskColumnSubscription from '../../subscriptions/task/MoveTaskColumnSubscription'
import MoveTaskSubscription from '../../subscriptions/task/MoveTaskSubscription'
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
            <AcceptProjectInviteSubscription user={user} />
            <NewProjectInviteSubscription user={user} />
            <NewTaskColumnSubscription user={user} />
            <NewTaskSubscription user={user} />
            <MoveTaskColumnSubscription user={user} />
            <MoveTaskSubscription user={user} />
        </>
    )
}

export default SubscriptionProvider