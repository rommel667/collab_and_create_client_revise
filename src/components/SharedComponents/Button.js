import React from 'react'

const Button = ({ buttonText, children, onClick }) => {
    return (
        <div>
        <button
          type="submit"
          onClick={onClick}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {children}
          </span>
          {buttonText}
        </button>
      </div>
    )
}

export default Button