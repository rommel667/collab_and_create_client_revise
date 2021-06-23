import React, { useState } from 'react'
import AuthHeader from '../Shared/AuthHeader'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Form from './Form'
import { REGISTER_USER } from '../../../../graphql/gql/user/mutation'

const Register = ({ user }) => {

    const history = useHistory()

    const [ formState, setFormState ] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [ error, setError ] = useState("")

    const [addUser] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            localStorage.setItem('email', result.data.registerUser.email)
            setFormState({ name: "", email: "", password: "", confirmPassword: "" })
            history.push('/verification')
        },
        variables: {
            name: formState.name, email: formState.email, password: formState.password
        },
        onError(err) {
            console.log(err.graphQLErrors[0]);
            setError(err.graphQLErrors[0].message);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, confirmPassword } = formState
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords not match!")
            return
        }
        addUser()
    }

    const onchangeInput = (event) => {
        setError("")
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
                    error={error}
                />

            </div>
        </div>
    )
}



export default Register