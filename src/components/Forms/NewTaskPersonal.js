import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from '../SharedComponents/TextArea'



const NewTaskPersonal = () => {

    const dispatch = useDispatch()
    const formData = useSelector(state => state.form.newTask)

    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_TASK_INPUT", payload: event.target })
    }


    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">

                
                <TextArea
                rows={12}
                    value={formData.description}
                    onChange={onChangeInput}
                    label="Task Description"
                    id="description"
                    name="description"
                    type=""
                    autoComplete="text"
                    placeholder="Task Description"
                />
                
            </div>

        </form>
    )
}

export default NewTaskPersonal