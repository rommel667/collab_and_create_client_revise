import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../SharedComponents/Input'
import MultiSelect from 'react-multi-select-component'

const NewTeam = () => {

    const dispatch = useDispatch()
    const { colleagues } = useSelector(state => state.dev)
    const { newTeam } = useSelector(state => state.form)

    const memberOptions = colleagues.map(col => {
        return { label: col.name, value: col._id }
    })

    const onChangeInput = (event) => {
        dispatch({ type: "ON_CHANGE_INPUT_TEAM_NAME", payload: event.target })
    }

    const onChangeMembers = (items) => {
        dispatch({ type: "ON_CHANGE_INPUT_TEAM_MEMBERS", payload: { items } })
    }

    return (
        <div>
            <p className="text-sm text-gray-500">Team Members</p>
            <MultiSelect
                options={memberOptions}
                value={newTeam.members}
                onChange={onChangeMembers}
                labelledBy="Team Members"
                className="mb-5"
            />
            <Input
                value={newTeam.teamName}
                onChange={onChangeInput}
                id="teamName"
                name="teamName"
                type="text"
                autoComplete="text"
                placeholder="Team Name"
            />


        </div>
    )
}

export default NewTeam