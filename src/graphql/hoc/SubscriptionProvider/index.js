import React from 'react'
import DevSubscription from '../../subscriptions/dev'
import ProjectSubscription from '../../subscriptions/project'
import TaskSubscription from '../../subscriptions/task'
import { useSelector } from 'react-redux'


const SubscriptionProvider = () => {

    const { user } = useSelector(state => state.user)

    return (
        <>
            <DevSubscription user={user} />
            <ProjectSubscription user={user} />
            <TaskSubscription user={user} />
        </>
    )
}

export default SubscriptionProvider