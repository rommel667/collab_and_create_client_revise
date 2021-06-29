import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import Badge from './Badge'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import NotificationList from './NotificationList'
import { FETCH_PROJECT_INVITES } from '../../../../../graphql/gql/notification/query'


const Notification = () => {

    const dispatch = useDispatch()
    const { projectInvites } = useSelector(state => state.notification)

    const [show, setShow] = useState(false)

    // const { loading, data } = useQuery(
    //     FETCH_PROJECT_INVITES,
    //     {
    //         onCompleted() {
    //             dispatch({ type: "FETCH_PROJECT_INVITES", payload: data.unconfirmProjectInvites })
    //         }
    //     })


    return (
        <Menu  as="div" className="ml-3 relative mt-2">
            {({ open }) => (
                <div className="">
                    <Badge show={show} projectInvites={projectInvites} setShow={() => setShow(!show)} />
                    <NotificationList show={show} projectInvites={projectInvites} />
                </div>
            )}
        </Menu>
    )
}



export default Notification