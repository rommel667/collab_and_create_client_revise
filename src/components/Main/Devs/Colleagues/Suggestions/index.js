import React from 'react'
import Suggestion from './Suggestion'


const Suggestions = ({ suggestions, myInfo }) => {

    return (
        <div className="space-y-3 w-1/2">
            <div>Suggestions</div>
            {suggestions.map(suggestion => {
                return (
                    <Suggestion key={suggestion._id} suggestion={suggestion} myInfo={myInfo} />
                )
            })}
        </div>
    )
}

export default Suggestions