import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Main = ({ user }) => {

const history = useHistory()

    useEffect(() => {
        if(!user) {
            history.replace("/")
        }
    }, [user])

    return (
        <div>
            Main
        </div>
    )
}

export default Main