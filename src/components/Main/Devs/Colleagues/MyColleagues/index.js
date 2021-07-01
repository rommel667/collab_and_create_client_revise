import React from 'react'
import Colleague from './Colleague'

const MyColleagues = ({ colleagues, myInfo }) => {

    return (
        <div className="space-y-3 w-1/2">
        <div>My Colleagues</div>
            {colleagues.map(col => {
                return (
                    <Colleague key={col._id} col={col} colleagues={colleagues} />
                )
            })}
        </div>
    )
}

export default MyColleagues