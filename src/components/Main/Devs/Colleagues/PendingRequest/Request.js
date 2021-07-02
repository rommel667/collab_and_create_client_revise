import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CANCEL_REQUEST } from '../../../../../graphql/gql/dev/mutation'
import Mutual from '../Shared/Mutual'

const Request = ({ request, colleagues }) => {

    const dispatch = useDispatch()

    const [mutual, setMutual] = useState(null)

    const [cancelRequest] = useMutation(CANCEL_REQUEST, {
        update(proxy, result) {
          dispatch({ type: "CANCEL_REQUEST_ON_PENDING", payload: { cancelRequest: result.data.cancelRequest } })
        },
        variables: {
            colleagueId: request._id
        }
      })


    useEffect(() => {
        const mutualColleagues = request?.colleagues.map(rc => {
            if (colleagues.some(mc => mc._id === rc._id)) {
                return rc
            }
            return null
        }).filter(rc => rc !== null)
        setMutual(mutualColleagues)
    }, [colleagues, request])

    return (
        <div key={request._id} className="flex items-center gap-3 shadow-md rounded-md p-3">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={request.photo}
                alt=""
            />
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{request.name}</p>
                {/* <p className="text-xs">{col.email}</p> */}

                <Mutual mutual={mutual} />
                <div>
                <button className="bg-red-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={cancelRequest}>Cancel</button>
                </div>
                
            </div>
        </div>
    )
}

export default Request