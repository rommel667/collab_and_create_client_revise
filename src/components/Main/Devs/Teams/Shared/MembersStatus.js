import React from 'react'

const MembersStatus = ({ categoryText, members }) => {
    return (
        <div className="flex items-start flex-col">
            <p className="text-xs">{categoryText}</p>
            <div className="flex">
                {members?.map((member, index) => {
                    if (index === 0) {
                        return (
                            <img
                                key={member._id}
                                className="h-5 w-5 rounded-full object-cover border-2"
                                src={member.photo}
                                alt=""
                            />
                        )
                    } else {
                        return (
                            <img
                                key={member._id}
                                className="h-5 w-5 rounded-full object-cover -ml-2 border-2"
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