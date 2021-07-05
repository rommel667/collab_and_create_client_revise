import React from 'react'

const Members = ({ members }) => {
    return (
        <div className="my-2">
            <p className="text-gray-700 text-xs">Members</p>

            <div className="flex items-center gap-1 ml-3">
                {members.map(member => {
                    return (
                        <img
                            key={member._id}
                            className="h-7 w-7 rounded-full object-cover border-2 border-white -ml-3"
                            src={member.photo}
                            alt="member" />
                    )
                })}


            </div>

        </div>
    )
}

export default Members