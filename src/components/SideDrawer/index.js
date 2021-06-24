import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuList from './MenuList'


const Sidedrawer = () => {

    const dispatch = useDispatch()
    const openDrawer = useSelector(state => state.layout.openDrawer)

    return (
        <aside
            className={`${openDrawer ? 'translate-x-0' : '-translate-x-full'} md:w-1/3 lg:w-1/5 bg-gray-100 transform top-0 left-0 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30`}
        >
        <MenuList closeDrawer={() => dispatch({ type: "TOGGLE_DRAWER" })}/>
        </aside>


    )
}

export default Sidedrawer