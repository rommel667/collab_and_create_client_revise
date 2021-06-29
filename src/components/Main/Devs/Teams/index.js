import React from 'react'
import { useSelector } from 'react-redux'
import VerifiedTeamsQuery from '../../../../graphql/queries/dev/VerifiedTeamsQuery'
import UnverifiedTeamsQuery from '../../../../graphql/queries/dev/UnverifiedTeamsQuery'
import MyTeams from './MyTeams'


const Teams = () => {

    const { verifiedTeams, unverifiedTeams } = useSelector(state => state.team)

    return (
        <div>
            <>
                <VerifiedTeamsQuery />
                <UnverifiedTeamsQuery />
            </>
            <MyTeams verifiedTeams={verifiedTeams} />
        </div>
    )
}

export default Teams