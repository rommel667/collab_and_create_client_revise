import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Overlay = () => {

    const dispatch = useDispatch()
    const { openDrawer } = useSelector(state => state.setting)

    return (
        openDrawer && 
        <div onClick={() => dispatch({ type: "TOGGLE_DRAWER" })} 
        className="z-20 bg-gray-500 h-screen w-screen absolute top-0 bg-opacity-50 md:hidden">

        </div>
    )
}

export default Overlay