import React from 'react'
import NotificationMenu from './NotificationMenu'
import ProfileMenu from './ProfileMenu'
import { FaBars, FaChevronLeft } from "react-icons/fa";
import Sidedrawer from '../../../SideDrawer';
import { useDispatch, useSelector } from 'react-redux';


const TopHeader = () => {

    const { openDrawer } = useSelector(state => state.layout)
    const dispatch = useDispatch()

    return (
        <div className="flex justify-between items-center">
            <Sidedrawer />


            <div className="md:hidden">
                <FaBars className="cursor-pointer mr-3" size={25} onClick={() => dispatch({ type: "TOGGLE_DRAWER" })} />
            </div>
            <div className="hidden md:block">
                {openDrawer ?
                    <FaChevronLeft className="cursor-pointer mr-3" size={25} onClick={() => dispatch({ type: "TOGGLE_DRAWER" })} /> :
                    <FaBars className="cursor-pointer mr-3" size={25} onClick={() => dispatch({ type: "TOGGLE_DRAWER" })} />}
            </div>
            <div className="relative flex flex-1 items-center pr-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 absolute left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="placeholder-gray-600 text-gray-900 rounded-md border border-gray-400 py-1 pl-8 focus:outline-none" placeholder="Search" />
            </div>
            <div className="flex justify-between items-center gap-3">
                <NotificationMenu />
                <ProfileMenu />
            </div>
        </div>
    )
}

export default TopHeader