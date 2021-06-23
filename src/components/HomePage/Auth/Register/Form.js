import React from 'react'
import Input from '../../../SharedComponents/Input'
import Button from '../../../SharedComponents/Button'

const Form = ({ handleSubmit, formState, onChangeInput, error }) => {
    return (
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              value={formState.name}
              onChange={onChangeInput}
              label="Username"
              id="name"
              name="name"
              type="text"
              autoComplete="text"
              placeholder="Username"
            />
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
            <Input
              value={formState.confirmPassword}
              onChange={onChangeInput}
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              placeholder="Confirm Password"
            />
           <p className="absolute text-xs text-red-500">{error}</p>

          </div>

          <Button buttonText="Register" />
           

        </form>
    )
}

export default Form