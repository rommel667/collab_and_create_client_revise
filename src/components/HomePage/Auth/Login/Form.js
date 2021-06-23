import React from 'react'
import Input from '../../../SharedComponents/Input'
import Button from '../../../SharedComponents/Button'
import LoginFooter from './LoginFooter'

const Form = ({ formState, handleSubmit, onChangeInput, rememberMe, toggleRememberMe }) => {

    return (
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
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