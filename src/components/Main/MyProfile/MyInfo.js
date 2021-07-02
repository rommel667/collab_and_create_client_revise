import React, { useEffect, useState } from 'react'

const MyInfo = ({ myInfo }) => {

    const [mySkills, setMySkills] = useState(null)

    useEffect(() => {
        const skills = myInfo?.skills.map((skill, index) => {
            return (
                <p key={index}>{index + 1}. {skill}</p>
            )
        })
        setMySkills(skills)
    }, [myInfo])

    return (
        <div>
            <div className="flex items-center gap-5 ">
                <div className="flex relative w-max">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={myInfo?.photo}
                        alt=""
                    />
                </div>
                <div>
                    <p className="text-gray-700 font-semibold text-lg">{myInfo?.name}</p>
                    <p className="text-gray-600 text-sm">{myInfo?.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm">Member Since: {myInfo?.createdAt.split("T")[0]}</p>
                <div className="text-sm flex gap-1">
                    <p>Portfolio:</p>
                    {myInfo?.portfolio === "" ? <p>No portfolio link added</p> :
                        <p className="cursor-pointer underline">{myInfo?.portfolio}</p>}
                </div>
                <div className="text-sm flex gap-1">
                    <p>Skills:</p>
                    <div>
                        {myInfo?.skills.length === 0 ? <p>No skills added</p> : mySkills}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default MyInfo