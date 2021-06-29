import React from 'react'
import MyInfoQuery from '../../queries/user/MyInfoQuery'
import ProjectsByUserQuery from '../../queries/project/ProjectsByUserQuery'
import VerifiedTeamsQuery from '../../queries/dev/VerifiedTeamsQuery'
import ColleaguesQuery from '../../queries/dev/ColleaguesQuery'

const InitialQueryProvider = () => {
    return (
        <>
            <MyInfoQuery />
            <ProjectsByUserQuery />
            <VerifiedTeamsQuery />
            <ColleaguesQuery />
        </>
    )
}

export default InitialQueryProvider