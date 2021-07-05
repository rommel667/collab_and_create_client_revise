import React from 'react'
import Project from './Project'
import { useSelector } from 'react-redux'

const Projects = () => {

    const { projects } = useSelector(state => state.project)

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {projects?.map(project => {
                return (
                    <Project key={project._id} {...project} />
                )
            })}

        </div>
    )
}

export default Projects