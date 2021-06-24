import React from 'react'
import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'

const WithUserHeader = () => {
    return (
        <header className="px-6 py-1 border-b-2 border-gray-200">
            <TopHeader />
            <BottomHeader/>
        </header>
    )
}

export default WithUserHeader