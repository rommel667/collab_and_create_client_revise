import React from 'react'
import ProjectsInitialQuery from './ProjectsInitialQuery'
import MyInfoQuery from './MyInfoQuery'

const InitialQueryProvider = () => {
    return (
        <>
            <ProjectsInitialQuery/>
            <MyInfoQuery/>
        </>
    )
}

export default InitialQueryProvider