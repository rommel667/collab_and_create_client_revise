import React from 'react'
import Team from './Team'

const MyTeams = ({ verifiedTeams }) => {
    return (
        <div className="space-y-3 w-1/2">
            <p className="text-base font-semibold">My Teams</p>
           
                {verifiedTeams.map(team => {
                    return (
                        <Team key={team._id} team={team} />
                    )
                })}
        

        </div>
    )
}

export default MyTeams