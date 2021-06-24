import React from 'react'
import { useParams } from 'react-router-dom'
import Colleagues from './Colleagues'
import Teams from './Teams'

const Devs = () => {

    const { devPage } = useParams()

    return (
        <div>
            {devPage === "colleagues" && <Colleagues />}
            {devPage === "teams" && <Teams />}
        </div>
    )
}

export default Devs