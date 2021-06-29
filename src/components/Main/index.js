import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Projects from './Projects'
import Tasks from './Tasks'
import Notes from './Notes'
import Devs from './Devs'
import { Switch, Route, useLocation } from 'react-router-dom'
import InitialQueryProvider from '../../graphql/hoc/InitialQueryProvider'
import MyProfile from './MyProfile'

const Main = ({ user }) => {

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        if (!user) {
            history.replace("/")
        }
    }, [user])

    return (
        <main className={`${location.pathname.split('/')[1] === "tasks" ? "overflow-hidden flex-1" : "overflow-auto"} p-3`}>
            <InitialQueryProvider />
            <Switch>

                <Route path='/projects' render={(props) => (
                    <Projects {...props} />)}
                />
                <Route path='/tasks/:projectId' render={(props) => (
                    <Tasks {...props} />)}
                />
                <Route path='/notes/:projectId' render={(props) => (
                    <Notes {...props} />)}
                />
                <Route exact path='/devs/:devPage' render={(props) => (
                    <Devs {...props} />)}
                />
                <Route path='/myprofile' render={(props) => (
                    <MyProfile {...props} />)}
                />
            </Switch>
        </main>
    )
}

export default Main