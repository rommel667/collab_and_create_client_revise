import React from 'react'
import WithUserHeader from './WithUserHeader'
import NoUserHeader from './NoUserHeader'


const Header = ({ user }) => {
    return (
        user ? <WithUserHeader /> : <NoUserHeader />
    )
}

export default Header