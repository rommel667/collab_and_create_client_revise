import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CANCEL_REQUEST, SEND_INVITE } from '../../../../../graphql/gql/dev/mutation'
import Mutual from '../Shared/Mutual'

const Suggestion = ({ suggestion, colleagues }) => {

    const dispatch = useDispatch()
    const { recentInvites } = useSelector(state => state.dev)

    const [mutual, setMutual] = useState(null)


    const [sendInvite] = useMutation(SEND_INVITE, {
        update(proxy, result) {
            dispatch({ type: "SEND_INVITE", payload: { newInvite: result.data.sendInvite } })
        },
        variables: {
            colleagueId: suggestion._id
        }
    })

    const [cancelRequest] = useMutation(CANCEL_REQUEST, {
        update(proxy, result) {
            dispatch({ type: "CANCEL_REQUEST_ON_SUGGESTIONS", payload: { cancelRequest: result.data.cancelRequest } })
        },
        variables: {
            colleagueId: suggestion._id
        }
    })

    useEffect(() => {
        const mutualColleagues = suggestion?.colleagues.map(sc => {
            if (colleagues.some(mc => mc._id === sc._id)) {
                return sc
            }
            return null
        }).filter(sc => sc !== null)
        console.log(mutualColleagues);
        setMutual(mutualColleagues)
    }, [colleagues, suggestion])

    return (
        <div key={suggestion._id} className="flex items-center gap-3 shadow-md rounded-md p-3">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={suggestion.photo}
                alt=""
            />
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{suggestion.name}</p>
                {/* <p className="text-xs">{col.email}</p> */}

                <Mutual mutual={mutual} />
                <div>
                    {recentInvites.includes(suggestion._id) && <p>Request Sent</p>}
                    {recentInvites.includes(suggestion._id) ?
                        <button onClick={cancelRequest}>Cancel</button> :
                        <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={sendInvite}>Invite</button>}
                    <button className="bg-indigo-500 px-2 rounded-md text-sm text-gray-200 font-semibold" onClick={sendInvite}>Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Suggestion