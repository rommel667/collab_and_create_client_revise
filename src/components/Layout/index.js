import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header'
import Overlay from '../SharedComponents/Overlay'

const Layout = ({ user, children }) => {

    const dispatch = useDispatch()
    const { openDrawer } = useSelector(state => state.setting)

    useEffect(() => {
        if(!user) {
            dispatch({ type: "SIGN_OUT_RESET_LAYOUT" })
        }
    }, [])

    return (
        <div className={`${openDrawer ? "md:margin-third lg:margin-fifth ": ""} transition-all duration-300 ease-in-out  h-screen flex overflow-hidden bg-white flex-col flex-1 min-w-0 flex-shrink-0`} >
            <Overlay />
            <Header user={user} />
            {children}
        </div>
    )
}

export default Layout