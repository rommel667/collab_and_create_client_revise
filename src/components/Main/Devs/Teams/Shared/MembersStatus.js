import React from 'react'

const MembersStatus = ({ categoryText, members }) => {
    return (
        <div className="flex items-center gap-2">
            <p>{categoryText}</p>
            <div className="flex">
                {members?.map((member, index) => {
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
    )
}

export default MembersStatus