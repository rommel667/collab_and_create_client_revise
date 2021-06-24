import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Header'
import Overlay from '../SharedComponents/Overlay'

const Layout = ({ user, children }) => {

    const { openDrawer } = useSelector(state => state.layout)

    return (
        <div className={`${openDrawer ? "md:margin-third lg:margin-fifth transition-all duration-300 ease-in-out": ""}  h-screen flex overflow-hidden bg-white flex-col flex-1 min-w-0 flex-shrink-0`} >
            <Overlay />
            <Header user={user} />
            {children}
        </div>
    )
}

export default Layout