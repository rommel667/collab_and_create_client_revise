import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Welcome from './Welcome'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Email from './Auth/ForgotPassword/Email'
import Code from './Auth/ForgotPassword/Code'
import NewPassword from './Auth/ForgotPassword/NewPassword'
import VerifyEmail from './Auth/VerifyEmail'

const HomePage = ({ user }) => {

    const history = useHistory()
    
    const location = useLocation()

    useEffect(() => {
        if(user && !(location.pathname.split('/')[1] === 'tasks') && !(location.pathname.split('/')[1] === 'devs') ) {
            history.replace("/projects")
        }
    }, [user])

    return (
        <main>
            <Switch>
                <Route exact path='/' render={(props) => (
                    <Welcome {...props} />)}
                />
                <Route path='/login' render={(props) => (
                    <Login {...props} />)}
                />
                <Route path='/register' render={(props) => (
                    <Register {...props} />)}
                />
                <Route path='/verification' render={(props) => (
                    <VerifyEmail {...props} />)}
                />
                <Route path='/forgotPassword' render={(props) => (
                    <Email {...props} />)}
                />
                <Route path='/forgotPasswordCode' render={(props) => (
                    <Code {...props} />)}
                />
                <Route path='/forgotPasswordNewPassword' render={(props) => (
                    <NewPassword {...props} />)}
                />
            </Switch>
        </main>
    )
}

export default HomePage