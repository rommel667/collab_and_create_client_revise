import React from 'react'

const Mutual = ({ mutual }) => {
    return (
        <div className="flex items-center gap-1">
            <div className={`${mutual?.length === 0 ? "hidden" : ""} flex items-center `}>
                {mutual?.map((m, i) => {
                    if (i < 3) {
                        if(i === 0) {
                            return (
                            <img
                                key={m._id}
                                className="h-6 w-6 rounded-full object-cover border-2 border-white"
                                src={m.photo}
                                alt=""
                            />
                        )
                        } else {
                            return (
                            <img
                                key={m._id}
                                className="h-6 w-6 rounded-full object-cover border-2 border-white -ml-2"
                                src={m.photo}
                                alt=""
                            />
                        )
                        }
                        
                    }
                    return null
                })}
            </div>
            <div className="text-xs">
                <p >{mutual?.length === 0 && "No mutual colleague"}</p>
                <p>{mutual?.length === 1 && "1 mutual colleague"}</p>
                <p>{mutual?.length > 1 && `${mutual?.length} mutual colleagues`}</p>
            </div>
        </div>
    )
}

export default Mutual