import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../SharedComponents/Input'
import TextArea from '../SharedComponents/TextArea'
import MultiSelect from 'react-multi-select-component'


const NewProject = () => {

    const dispatch = useDispatch()
    const formData = useSelector(state => state.form.newProject)
    const colleagues = useSelector(state => state.dev.colleagues)

    const memberOptions = colleagues.map(colleague => {
        return { label: colleague.email, value: colleague._id }
    })

    const techStackOptions = [
        { label: "React", value: "React" },
        { label: "Vue", value: "Vue" },
        { label: "Angular", value: "Angular" },
    ]


    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_PROJECT_INPUT", payload: event.target })
    }


    const onChangeMembers = (items) => {
        dispatch({ type: "SELECT_MEMBERS", payload: { items } })
    }

    const onChangeTechStacks = (items) => {
        dispatch({ type: "SELECT_TECH_STACKS", payload: { items } })
    }


    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="">

                <p className="text-sm text-gray-500">Members</p>
                <MultiSelect
                    options={memberOptions}
                    value={formData.unconfirmMembers}
                    onChange={onChangeMembers}
                    labelledBy="In Charge"
                    className="z-20 overflow-y-visible mb-5"
                />

                <p className="text-sm text-gray-500">TechStacks</p>
                <MultiSelect
                    options={techStackOptions}
                    value={formData.techStacks}
                    onChange={onChangeTechStacks}
                    labelledBy="In Charge"
                    className="z-20 overflow-y-visible"
                />

                <Input
                    value={formData.projectName}
                    onChange={onChangeInput}
                    label="Project Name"
                    id="projectName"
                    name="projectName"
                    type="text"
                    autoComplete="text"
                    placeholder="Project Name"
                />

                <TextArea
                    rows={8}
                    value={formData.description}
                    onChange={onChangeInput}
                    label="Project Description"
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="text"
                    placeholder="Project Description"
                />

            </div>

        </form>
    )
}

export default NewProject