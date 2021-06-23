import React, { useState } from 'react'
import AuthHeader from '../Shared/AuthHeader'
import Input from '../../../SharedComponents/Input'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Button from '../../../SharedComponents/Button'
import { NEW_PASSWORD } from '../../../../graphql/gql/user/mutation'

const NewPassword = () => {

    const history = useHistory()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)

    const [newPassword] = useMutation(NEW_PASSWORD, {
        update(proxy, result) {
            localStorage.removeItem('email')
            if (result.data.newPassword) {
                history.replace('/login')
            }
        },
        variables: {
            email: localStorage.getItem('email'), password
        },
        onError(err) {
            setError(err.graphQLErrors[0].message.split(': ')[1]);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Password not match")
            return
        }
        newPassword()
    }

    return (
        <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <AuthHeader
                    headerText="Forgot Password (Step 2/3)"
                />

                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                            />
                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                label="Confirm Password"
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Confirm Password"
                            />

                            {error && <p>{error}</p>}
                        </div>

                    </div>

                    <Button buttonText="Confirm" />
                        
                </form>
            </div>
        </div>
    )
}

export default NewPassword