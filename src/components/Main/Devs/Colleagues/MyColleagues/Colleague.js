import React, { useEffect, useState } from 'react'
import Mutual from '../Shared/Mutual'
import ProfileModal from '../../../../SharedComponents/ProfileModal'
import ColleagueProfile from './ColleagueProfile'
import ModalComponent from '../../../../SharedComponents/ModalComponent'
import { useDispatch } from 'react-redux'

const Colleague = ({ col, colleagues }) => {

    const dispatch = useDispatch()

    const [mutual, setMutual] = useState(null)
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        const mutualColleagues = col?.colleagues.map(cc => {
            if (colleagues.some(mc => mc._id === cc._id)) {
                return cc
            }
            return null
        }).filter(cc => cc !== null)
        setMutual(mutualColleagues)
    }, [col.colleagues])

    const onCloseProfile = () => {
        setShowProfile(false)
    }

    return (
        <div key={col._id} className="flex items-center gap-3 shadow-md rounded-md p-3">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={col.photo}
                alt=""
            />
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{col.name}</p>

                <Mutual mutual={mutual} />

                <div>
                    <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={() => setShowProfile(true)}>Profile</button>
                    <button className="bg-red-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={() => { }}>Remove</button>
                </div>
            </div>
            <ProfileModal
                open={showProfile}
                onClose={onCloseProfile}
                cancel={onCloseProfile}
            >
                <ColleagueProfile colleagueId={col._id} />
            </ProfileModal>

        </div>
    )
}

export default Colleague