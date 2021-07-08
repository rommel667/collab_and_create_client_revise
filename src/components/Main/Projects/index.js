import React, { useState, useEffect } from 'react'
import Project from './Project'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Projects = () => {

    const location = useLocation()

    const { projects } = useSelector(state => state.project)

    const [ status, setStatus ] = useState("Ongoing")

    useEffect(() => {
        if(location.pathname.split('/')[1] === "projects") {
            if(location.pathname.split('/')[2] === "" || location.pathname.split('/')[2] === "ongoing") {
                setStatus("Ongoing")
            }
            if(location.pathname.split('/')[2] === "finished") {
                setStatus("Finished")
            }
            if(location.pathname.split('/')[2] === "cancelled") {
                setStatus("Cancelled")
            }
        }
    }, [location])

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects?.filter(project => project.status === status).map(project => {
                return (
                    <Project key={project._id} {...project} />
                )
            })}

        </div>
    )
}

export default Projects