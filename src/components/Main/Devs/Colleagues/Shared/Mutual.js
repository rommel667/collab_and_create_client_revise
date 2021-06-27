import React from 'react'

const Mutual = ({ mutual }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`${mutual?.length === 0 ? "hidden" : ""} flex items-center gap-1 ml-3`}>
                {mutual?.map((m, i) => {
                    if (i < 4) {
                        return (
                            <img
                                key={m._id}
                                className="h-6 w-6 rounded-full object-cover border-2 border-white -ml-3"
                                src={m.photo}
                                alt=""
                            />
                        )
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