import React from 'react'

const Team = ({ team }) => {
    return (
        <div>
            <p>Team Name: {team.teamName}</p>
            <p>Created By: {team.createdBy.name}</p>
            {team.members.map(member => {
                return (
                    <p key={member._id}>{member.name}</p>
                )
            })}
        </div>
    )
}

export default Team