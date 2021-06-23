import React, { useState } from 'react'
import AuthHeader from '../Shared/AuthHeader'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Form from './Form'
import { REGISTER_USER } from '../../../../graphql/gql/user/mutation'

const Register = ({ user }) => {

    const history = useHistory()

    const [formState, setFormState] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    const [addUser] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            localStorage.setItem('email', result.data.registerUser.email)
            history.push('/verification')
        },
        variables: {
            name: formState.name, email: formState.email, password: formState.password
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, confirmPassword } = formState
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            return
        }
        if (password !== confirmPassword) {
            return
        }
        addUser()
        setFormState({ name: "", email: "", password: "", confirmPassword: "" })
    }

    const onchangeInput = (event) => {
        const { name, value } = event.target
        setFormState({ ...formState, [name]: value })
    }

    return (
        <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <AuthHeader
                    headerText="New account registration"
                />

                <Form
                    handleSubmit={handleSubmit}
                    formState={formState}
                    onChangeInput={onchangeInput}
                />

            </div>
        </div>
    )
}



export default Register