import React from 'react'
import Team from './Team'

const MyTeams = ({ verifiedTeams }) => {
    return (
        <div className="space-y-3">
            {verifiedTeams.map(team => {
                return (
                    <Team key={team._id} team={team} />
                )
            })}
        </div>
    )
}

export default MyTeams