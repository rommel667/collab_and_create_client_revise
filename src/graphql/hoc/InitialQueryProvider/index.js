import React from 'react'
import ColleaguesInitialQuery from './ColleaguesInitialQuery'
import ProjectsInitialQuery from './ProjectsInitialQuery'
import MyInfoQuery from './MyInfoQuery'

const InitialQueryProvider = () => {
    return (
        <>
            <ProjectsInitialQuery/>
            <ColleaguesInitialQuery/>
            <MyInfoQuery/>
        </>
    )
}

export default InitialQueryProvider