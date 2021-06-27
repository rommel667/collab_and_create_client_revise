import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { useQuery } from '@apollo/client';
import { FETCH_COLLEAGUES } from '../../../../../../graphql/gql/dev/query';
import MyColleagues from './MyColleagues';

const MyProfile = () => {

    const dispatch = useDispatch()
    const { myInfo } = useSelector(state => state.user)
    const { colleagues } = useSelector(state => state.dev)

  

    const { data: colleaguesData } = useQuery(
        FETCH_COLLEAGUES,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_COLLEAGUES", payload: { colleagues: colleaguesData.colleagues } })
            }
        })

    return (
        <div>
            <div className="flex items-center gap-5">
                <div className="flex relative w-max">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={myInfo.photo}
                        alt=""
                    />
                    <FaPlus className="absolute top-2/3 left-2/3 text-gray-500" size={17} />
                </div>
                <div>
                    <p className="text-gray-700 font-semibold text-lg">{myInfo.name}</p>
                    <p className="text-gray-600 text-sm">{myInfo.email}</p>
                </div>
            </div>
            <div>
                <p>Member Since: {myInfo.createdAt.split("T")[0]}</p>
               
            </div>
            <div>
                <div>
                    <div>
                    <MyColleagues colleagues={colleagues} myInfo={myInfo} />
                    </div>
                    
                </div>
                <div>
                    <p>Teams</p>
                </div>
            </div>


        </div>
    )
}

export default MyProfile