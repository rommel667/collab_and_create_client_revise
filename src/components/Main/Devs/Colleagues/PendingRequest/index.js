import React from 'react'
import Request from './Request'

const PendingRequest = ({ pendingRequest, myInfo }) => {

    return (
        <div className="space-y-3 w-1/2">
            {pendingRequest.map(request => {
                return (
                    <Request key={request._id} request={request} myInfo={myInfo} />
                )
            })}
        </div>
    )
}

export default PendingRequest