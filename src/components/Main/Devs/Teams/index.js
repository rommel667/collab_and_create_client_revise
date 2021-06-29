import React from 'react'
import { useSelector } from 'react-redux'
import VerifiedTeamsQuery from '../../../../graphql/queries/dev/VerifiedTeamsQuery'
import UnverifiedTeamsQuery from '../../../../graphql/queries/dev/UnverifiedTeamsQuery'
import MyTeams from './MyTeams'
import UnverifiedTeams from './UnverifiedTeams'


const Teams = () => {

    const { verifiedTeams, unverifiedTeams } = useSelector(state => state.team)

    return (
        <div>
            <>
                <VerifiedTeamsQuery />
                <UnverifiedTeamsQuery />
            </>
            <div className="flex justify-between items-start">
                <MyTeams verifiedTeams={verifiedTeams} />
                <UnverifiedTeams unverifiedTeams={unverifiedTeams} />
            </div>

        </div>
    )
}

export default Teams