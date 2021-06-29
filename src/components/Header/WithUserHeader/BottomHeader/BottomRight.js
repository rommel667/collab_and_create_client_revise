import React from 'react'
import { useLocation } from 'react-router'

const BottomRight = ({ openModalHandler }) => {

    const location = useLocation()

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={openModalHandler}
                className="flex justify-center items-center bg-indigo-600 rounded-md py-1 pr-2 pl-1 text-gray-100 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {location.pathname.split('/')[2] === "teams" && "New Team"}
            </button>
        </div>
    )
}

export default BottomRight