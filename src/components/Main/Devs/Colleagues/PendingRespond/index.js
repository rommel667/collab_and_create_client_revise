import React from 'react'
import Respond from './Respond'

const PendingRespond = ({ pendingRespond, colleagues }) => {

    return (
        <div className="space-y-3 w-1/2">
            {pendingRespond.map(respond => {
                return (
                    <Respond key={respond._id} respond={respond} colleagues={colleagues} />
                )
            })}
        </div>
    )
}

export default PendingRespond