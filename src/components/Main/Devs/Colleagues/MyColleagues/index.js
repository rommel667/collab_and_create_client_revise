import React from 'react'
import Colleague from './Colleague'

const MyColleagues = ({ colleagues, myInfo }) => {

    return (
        <div className="space-y-3">
            {colleagues.map(col => {
                return (
                    <Colleague col={col} myInfo={myInfo} />
                )
            })}
        </div>
    )
}

export default MyColleagues