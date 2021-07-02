import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MembersStatus from '../Shared/MembersStatus'

const Team = ({ team }) => {

    const { myInfo } = useSelector(state => state.user)

    const [verifiedMembers, setVerifiedMembers] = useState(null)
    const [unverifiedMembers, setUnverifiedMembers] = useState(null)

    useEffect(() => {
        const verifiedArray = []
        const unverifiedArray = []
        team.members.map(member => {
            if (member.verifiedTeams.some(t => t._id === team._id)) {
                verifiedArray.push(member)
            } else {
                unverifiedArray.push(member)
            }
            return null
        })
        setVerifiedMembers(verifiedArray)
        setUnverifiedMembers(unverifiedArray)
    }, [team])

    return (
        <div>
            <p>Team Name: {team.teamName}</p>
            <p>Created By: {team.createdBy.name}</p>
            
            <MembersStatus categoryText="Members:" members={verifiedMembers} />

            <MembersStatus categoryText="Pending:" members={unverifiedMembers} />

            
        </div>
    )
}

export default Team