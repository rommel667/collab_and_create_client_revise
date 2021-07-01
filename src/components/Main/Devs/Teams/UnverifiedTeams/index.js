import React from 'react'
import UnverifiedTeam from './UnverifiedTeam'

const UnverifiedTeams = ({ unverifiedTeams }) => {
    return (
        <div className="space-y-3">
            {unverifiedTeams.map(team => {
                return (
                    <UnverifiedTeam key={team._id} team={team} />
                )
            })}
        </div>
    )
}

export default UnverifiedTeams