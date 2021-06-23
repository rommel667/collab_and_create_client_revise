import React from 'react'
import Input from '../../../SharedComponents/Input'
import Button from '../../../SharedComponents/Button'
import LoginFooter from './LoginFooter'
import { useHistory } from 'react-router-dom'

const Form = ({ formState, handleSubmit, onChangeInput, rememberMe, toggleRememberMe, error }) => {

  const history = useHistory()

  const unVerifiedHandler = () => {
    localStorage.setItem('email', formState.email)
    history.push('/verification')
  }

  return (
    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px relative">
        <Input
          value={formState.email}
          onChange={onChangeInput}
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
        />
        <Input
          value={formState.password}
          onChange={onChangeInput}
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
        />
        {error === "Please check your email for verification code to proceed" ? 
        <p className="absolute text-xs text-red-500">{error}. 
        <span onClick={unVerifiedHandler} className="cursor-pointer text-gray-900">
        Click to enter code.</span></p> :
        <p className="absolute text-xs text-red-500">{error}</p>}

      </div>

      <LoginFooter
        rememberMe={rememberMe}
        setRememberMe={toggleRememberMe}
      />

      <Button buttonText="Sign in" />


    </form>
  )
}

export default Form