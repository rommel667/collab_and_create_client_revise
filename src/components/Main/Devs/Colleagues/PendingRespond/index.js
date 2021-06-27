import React from 'react'
import Respond from './Respond'

const PendingRespond = ({ pendingRespond, myInfo }) => {

    return (
        <div className="space-y-3 w-1/2">
            {pendingRespond.map(respond => {
                return (
                    <Respond key={respond._id} respond={respond} myInfo={myInfo} />
                )
            })}
        </div>
    )
}

export default PendingRespond