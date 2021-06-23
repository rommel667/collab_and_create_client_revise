import React from 'react'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { SIGN_IN_WITH_GOOGLE } from '../../../../graphql/gql/user/mutation'

const GoogleSignIn = () => {

    const dispatch = useDispatch()

    const [googleSignin] = useMutation(SIGN_IN_WITH_GOOGLE, {
        update(proxy, result) {
            dispatch({ type: "LOGIN", payload: { user: result.data.signInWithGoogle } })
        },
        // onError(err) {
        //   setError(err.graphQLErrors[0].message.split(': ')[1]);
        // }
    })


    const responseGoogle = (response) => {
        googleSignin({
            variables: {
                name: response.profileObj.name, email: response.profileObj.email, photo: response.profileObj.imageUrl, token: response.tokenId
            }
        })
    }

    return (

        <GoogleLogin
            className="w-full flex items-center justify-center"
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Sign in with Google'
            cookiePolicy={'single_host_origin'}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
        />

    )
}



export default GoogleSignIn