import React, { useState } from 'react'
import AuthHeader from '../Shared/AuthHeader'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import GoogleSignIn from './GoogleSignIn'
import Divider from './Divider'
import Form from './Form'
import { LOGIN_USER } from '../../../../graphql/gql/user/mutation'

const Login = () => {

    const [formState, setFormState] = useState({ email: "", password: "" })
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            setFormState({ email: "", password: "" })
            rememberMe ?
                dispatch({ type: "LOGIN_REMEMBER_ME_TRUE", payload: { user: result.data.login } }) :
                dispatch({ type: "LOGIN_REMEMBER_ME_FALSE", payload: { user: result.data.login } })
        },
        variables: {
            email: formState.email, password: formState.password
        }
    })


    const handleSubmit = (e) => {
        const { email, password } = formState
        if (email === "" || password === "") {
            return
        }
        e.preventDefault()
        loginUser()
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target
        setFormState({ ...formState, [name]: value })
    }

    return (
        <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <AuthHeader
                    headerText="Sign in to your account"
                />

                <Form
                    formState={formState}
                    handleSubmit={handleSubmit}
                    onChangeInput={onChangeInput}
                    rememberMe={rememberMe}
                    toggleRememberMe={() => setRememberMe(!rememberMe)}
                />

                <Divider />

                <GoogleSignIn />

            </div>
        </div>
    )
}



export default Login
