import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Projects from './Projects'
import Notes from './Notes'
import Devs from './Devs'
import ProjectTasks from './Tasks/ProjectTasks'
import AssignedTasks from './AssignedTasks'
import CreatedTasks from './CreatedTasks'
import PersonalTasks from './Tasks/PersonalTasks'
import { Switch, Route, useLocation } from 'react-router-dom'
import InitialQueryProvider from '../../graphql/hoc/InitialQueryProvider'
import MyProfile from './MyProfile'
import { useSelector } from 'react-redux'

const Main = ({ user }) => {

    const history = useHistory()
    const location = useLocation()
    const { projects } = useSelector(state => state.project)
    const { myInfo } = useSelector(state => state.user)

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
                <Route exact path='/tasks/personaltasks' render={(props) => (
                    myInfo && <PersonalTasks {...props} />)}
                />
                <Route exact path='/tasks/assignedtome' render={(props) => (
                    projects && <AssignedTasks {...props} />)}
                />
                <Route exact path='/tasks/createdbyme' render={(props) => (
                    projects && <CreatedTasks {...props} />)}
                />
                <Route path='/tasks/:projectId' render={(props) => (
                    projects && <ProjectTasks {...props} />)}
                />
                <Route path='/notes/:projectId' render={(props) => (
                    projects && <Notes {...props} />)}
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