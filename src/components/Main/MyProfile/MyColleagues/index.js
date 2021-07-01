import React from 'react'
import Colleague from './Colleague'

const MyColleagues = ({ colleagues, myInfo }) => {

    return (
        <div className="space-y-3">
            <div>My Colleagues ({colleagues.length})</div>
            {colleagues?.map(col => {
                return (
                    <Colleague key={col._id} col={col} myInfo={myInfo} colleagues={colleagues} />
                )
            })}
        </div>
    )
}

export default MyColleagues