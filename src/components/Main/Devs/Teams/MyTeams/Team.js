import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
        console.log("Verified", verifiedArray);
        console.log("UNVerified", unverifiedArray);
        setVerifiedMembers(verifiedArray)
        setUnverifiedMembers(unverifiedArray)
    }, [team])

    return (
        <div>
            <p>Team Name: {team.teamName}</p>
            <p>Created By: {team.createdBy.name}</p>
            <div className="flex items-center gap-2">
                <p>Members:</p>
                <div className="flex">
                    {verifiedMembers?.map((member, index) => {
                        if (index === 0) {
                            return (
                                <img
                                    key={member._id}
                                    className="h-6 w-6 rounded-full object-cover border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        } else {
                            return (
                                <img
                                    key={member._id}
                                    className="h-6 w-6 rounded-full object-cover -ml-2 border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        }

                    })}
                </div>

            </div>
            <div className="flex items-center gap-2">
                <p>Pending:</p>
                <div className="flex">
                    {unverifiedMembers?.map((member, index) => {
                        if (index === 0) {
                            return (
                                <img
                                    key={member._id}
                                    className="h-6 w-6 rounded-full object-cover border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        } else {
                            return (
                                <img
                                    key={member._id}
                                    className="h-6 w-6 rounded-full object-cover -ml-2 border-2"
                                    src={member.photo}
                                    alt=""
                                />
                            )
                        }
                    })}
                </div>

            </div>
        </div>
    )
}

export default Team