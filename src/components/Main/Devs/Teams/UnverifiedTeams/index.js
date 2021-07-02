import React from 'react'
import UnverifiedTeam from './UnverifiedTeam'

const UnverifiedTeams = ({ unverifiedTeams }) => {
    return (
        <div className="space-y-3 w-1/2">
        <p className="text-base font-semibold">Invites</p>
            {unverifiedTeams.map(team => {
                return (
                    <UnverifiedTeam key={team._id} team={team} />
                )
            })}
        </div>
    )
}

export default UnverifiedTeams