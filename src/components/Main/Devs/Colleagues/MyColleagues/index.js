import React from 'react'
import Colleague from './Colleague'

const MyColleagues = ({ colleagues }) => {

    return (
        <div className="space-y-3 w-1/2">
        <p className="text-base font-semibold">My Colleagues ({colleagues.length})</p>
            {colleagues.map(col => {
                return (
                    <Colleague key={col._id} col={col} colleagues={colleagues} />
                )
            })}
        </div>
    )
}

export default MyColleagues