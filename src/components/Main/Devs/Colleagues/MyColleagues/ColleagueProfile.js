import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { gql } from 'graphql-tag';


const ColleagueProfile = ({ colleagueId }) => {

    const [mySkills, setMySkills] = useState(null)

    const { data } = useQuery(USER_INFO,
        {
            variables: { userId: colleagueId },
            fetchPolicy: "no-cache"
        })

    useEffect(() => {
        const skills = data?.userInfo.skills.map((skill, index) => {
            return (
                <p key={index}>{index + 1}. {skill}</p>
            )
        })
        setMySkills(skills)
    }, [data])

    return (
        <div>
            <div className="flex items-center gap-5 ">
                <div className="flex relative w-max">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={data?.userInfo.photo}
                        alt=""
                    />
                </div>
                <div>
                    <p className="text-gray-700 font-semibold text-lg">{data?.userInfo.name}</p>
                    <p className="text-gray-600 text-sm">{data?.userInfo.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm">Member Since: {data?.userInfo.createdAt.split("T")[0]}</p>
                <div className="text-sm flex gap-1">
                    <p>Portfolio:</p>
                    {data?.userInfo.portfolio === "" ? <p>No portfolio link added</p> :
                        <p className="cursor-pointer underline">{data?.userInfo.portfolio}</p>}
                </div>
                <div className="text-sm flex gap-1">
                    <p>Skills:</p>
                    <div>
                        {data?.userInfo.skills.length === 0 ? <p>No skills added</p> : mySkills}
                    </div>
                </div>

            </div>
        </div>
    )
}

export const USER_INFO = gql`
query userInfo($userId: ID!) {
  userInfo(userId: $userId) {
    _id
    name
    email
    photo
    skills
    portfolio
    createdAt
    updatedAt
  }
}

`

export default ColleagueProfile