import React, { useEffect, useState } from 'react'

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

                <div className="flex items-center gap-2">
                {mutual?.map((m, i) => {
                    if (i < 4) {
                        return (
                            <img
                                key={m.id}
                                className="h-5 w-5 rounded-full object-cover"
                                src={m.photo}
                                alt=""
                            />
                        )
                    }
                })}
                <div className="text-xs">
                    <p >{mutual?.length === 0 && "No mutual colleague"}</p>
                    <p>{mutual?.length === 1 && "1 mutual colleague"}</p>
                    <p>{mutual?.length > 1 && `${mutual?.length} mutual colleagues`}</p>
                </div>
            </div>

            </div>

            

        </div>
    )
}

export default Colleague