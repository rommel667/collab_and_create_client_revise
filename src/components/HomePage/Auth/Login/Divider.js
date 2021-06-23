import React from 'react'

const Divider = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-1">
            <div className="border-t-2 flex flex-1"></div>
            <div className="bg-gray-300 p-2 rounded-full font-semibold text-xs">OR</div>
            <div className="border-t-2 flex flex-1"></div>
        </div>
    )
}

export default Divider