import React from 'react'
import { useLocation } from 'react-router'

const BottomRight = ({ setOpenNewTeamModal, setOpenNewProjectModal, setOpenNewTaskColumnModal, setOpenNewTaskColumnPersonalModal }) => {

    const location = useLocation()

    const openModalHandler = () => {
        if (location.pathname.split('/')[2] === "teams") {
            setOpenNewTeamModal()
        }
        if (location.pathname.split('/')[1] === "projects") {
            setOpenNewProjectModal()
        }
        if (location.pathname.split('/')[1] === "tasks"  && location.pathname.split('/')[2] !== "personaltasks") {
            setOpenNewTaskColumnModal()
        }
        if (location.pathname.split('/')[1] === "tasks" && location.pathname.split('/')[2] === "personaltasks") {
            setOpenNewTaskColumnPersonalModal()
        }
    }

    return (
        <div className="flex items-center gap-1">
            {(location.pathname.split('/')[2] === "assignedtome" || location.pathname.split('/')[2] === "createdbyme" || location.pathname.split('/')[2] === "colleagues" || 
            location.pathname.split('/')[2] === "finished" || location.pathname.split('/')[2] === "cancelled") ? null :
            <button
                onClick={openModalHandler}
                className="flex justify-center items-center bg-indigo-600 rounded-md py-1 pr-2 pl-1 text-gray-100 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {location.pathname.split('/')[2] === "teams" && "New Team"}
                {location.pathname.split('/')[1] === "projects" && "New Project"}
                {location.pathname.split('/')[1] === "tasks" && "Add Column"}
                {location.pathname.split('/')[1] === "notes" && "Add Category"}
            </button>}
        </div>
    )
}

export default BottomRight