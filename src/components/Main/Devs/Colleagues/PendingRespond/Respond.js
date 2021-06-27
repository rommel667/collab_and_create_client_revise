import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACCEPT_INVITE, REJECT_INVITE } from '../../../../../graphql/gql/dev/mutation'
import { FETCH_COLLEAGUES, FETCH_PENDING_INVITES_RESPOND } from '../../../../../graphql/gql/dev/query'
import Mutual from '../Shared/Mutual'

const Respond = ({ respond, myInfo }) => {

    const dispatch = useDispatch()
    const { recentAccepts } = useSelector(state => state.dev)

    const [mutual, setMutual] = useState(null)

    const [acceptInvite] = useMutation(ACCEPT_INVITE, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_COLLEAGUES,
            });
            if(data) {
                proxy.writeQuery({
                    query: FETCH_COLLEAGUES,
                    data: {
                        colleagues: [
                            result.data.acceptInvite, ...data.colleagues
                        ]
                    }
                });
            }
            dispatch({ type: "RESPOND_ACCEPT_INVITE", payload: { acceptInvite: result.data.acceptInvite } })
        },
        variables: {
            colleagueId: respond._id
        }
    })

    const [rejectInvite] = useMutation(REJECT_INVITE, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_PENDING_INVITES_RESPOND,
            });
            if(data) {
                proxy.writeQuery({
                    query: FETCH_PENDING_INVITES_RESPOND,
                    data: {
                        pendingInvitesRespond: [
                            ...data.pendingInvitesRespond.filter(res => res._id !== result.data.rejectInvite._id)
                        ]
                    }
                });
            }
            dispatch({ type: "RESPOND_REJECT_INVITE", payload: { rejectInvite: result.data.rejectInvite } })
        },
        variables: {
            colleagueId: respond._id
        }
    })


    useEffect(() => {
        console.log("RERENDER", respond);
        const mutualColleagues = respond?.colleagues.map(rc => {
            if (myInfo?.colleagues.some(mc => mc._id === rc._id)) {
                return rc
            }
            return null
        }).filter(rc => rc !== null)
        setMutual(mutualColleagues)
    }, [myInfo, respond])

    return (
        <div key={respond._id} className="flex items-center gap-3 border-2 p-3">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={respond.photo}
                alt=""
            />
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{respond.name}</p>

                <Mutual mutual={mutual} />

                {recentAccepts.includes(respond._id) ? <p>Accepted Request</p> :
                <div>
                    <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={acceptInvite}>Accept</button>
                    <button className="bg-red-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={rejectInvite}>Reject</button>
                </div>}

            </div>
        </div>
    )
}

export default Respond