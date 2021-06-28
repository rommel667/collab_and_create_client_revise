import React, { useEffect, useState } from 'react'
import Mutual from '../../Devs/Colleagues/Shared/Mutual'

const Colleague = ({ col, myInfo }) => {

    const [mutual, setMutual] = useState(null)

    useEffect(() => {
        const mutualColleagues = col?.colleagues.map(cc => {
            if (myInfo?.colleagues.some(mc => mc._id === cc._id)) {
                return cc
            }
            return null
        }).filter(cc => cc !== null)
        console.log(mutualColleagues);
        setMutual(mutualColleagues)
    }, [myInfo, col])

    return (
        <div key={col._id} className="flex items-center gap-3 border-2 p-3">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={col.photo}
                alt=""
            />
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{col.name}</p>
                {/* <p className="text-xs">{col.email}</p> */}

                <Mutual mutual={mutual} />

            </div>
        </div>
    )
}

export default Colleague