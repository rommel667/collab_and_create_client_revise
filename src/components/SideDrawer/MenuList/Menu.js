import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Menu = ({ menu, menuGroupText }) => {

    const location = useLocation()
    const { projects } = useSelector(state => state.project)
    const { colleagues } = useSelector(state => state.dev)
    const { verifiedTeams } = useSelector(state => state.team)
    const { myInfo, user } = useSelector(state => state.user)

    const [ personalTasksCount, setPersonalTasksCount ] = useState(0)
    const [ personalNotesCount, setPersonalNotesCount ] = useState(0)
    const [ taskAssignToMe, setTaskAssignToMe ] = useState(null)
    const [ taskCreatedByMe, setTaskCreatedByMe ] = useState(null)
    const [ noteCreatedByMe, setNoteCreatedByMe ] = useState(null)

    useEffect(() => {
        let tasksCount = 0
        let notesCount = 0
        const taskAssignToMe = []
        const taskCreatedByMe = []
        const noteCreatedByMe = []
        myInfo?.personalTaskColumns.map(col => {
            col.tasks.map(task => {
                tasksCount = tasksCount + 1
                return null
            })
            return null
        })
        myInfo?.personalNoteCategories.map(cat => {
            cat.notes.map(note => {
                notesCount = notesCount + 1
                return null
            })
            return null
        })
        projects?.map(project => {
            project.taskColumns.map(col => {
                col.tasks.map(task => {
                    if(task.createdBy._id === user._id) {
                        taskCreatedByMe.push(task._id)
                    }
                    if(task.inCharge.some(ic => ic._id === user._id)) {
                        taskAssignToMe.push(task._id)
                    }
                    return null
                })
                return null
            })
            return null
        })
        projects?.map(project => {
            project.noteCategories.map(cat => {
                cat.notes.map(note => {
                    if(note.createdBy._id === user._id) {
                        noteCreatedByMe.push(note._id)
                    }
                    return null
                })
                return null
            })
            return null
        })
       
        setPersonalTasksCount(tasksCount)
        setPersonalNotesCount(notesCount)
        setTaskAssignToMe(taskAssignToMe)
        setTaskCreatedByMe(taskCreatedByMe)
        setNoteCreatedByMe(noteCreatedByMe)
    }, [projects, myInfo])
    
    return (
        <Link
            to={`${menu.path}`}
            className={`cursor-pointer flex justify-between items-center 
             rounded-lg px-3 py-2 text-sm font-medium 
            ${location.pathname === menu.path ? "text-gray-900 bg-gray-300" : "text-gray-500 bg-gray-200"}`}
        >
            {menu.text}

            <span className={`${location.pathname === menu.path ? "text-gray-900" : "text-gray-500"} text-xs font-semibold`}>
            {menuGroupText === "Projects" && projects?.filter(project => project.status === menu.text).length}

            {(menuGroupText === "Tasks" && menu.text === "Personal Tasks" ) && personalTasksCount}
            {(menuGroupText === "Tasks" && menu.text === "Assigned to me" ) && taskAssignToMe?.length}
            {(menuGroupText === "Tasks" && menu.text === "Created by me" ) && taskCreatedByMe?.length}

            {(menuGroupText === "Notes" && menu.text === "Personal Notes" ) && personalNotesCount}
            {(menuGroupText === "Notes" && menu.text === "Created by me" ) && noteCreatedByMe?.length}

            {(menuGroupText === "Devs" && menu.text === "Colleagues") && colleagues?.length}
            {(menuGroupText === "Devs" && menu.text === "Teams") && verifiedTeams?.length}
            </span>
        </Link>
    )
}

export default Menu