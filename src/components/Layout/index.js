import React from 'react'
import Header from '../Header'
import Main from '../Main'

const Layout = () => {
    return (
        <div className="bg-white flex flex-col flex-1 min-w-0 flex-shrink-0">
            <Header />
            <Main />
        </div>
    )
}

export default Layout