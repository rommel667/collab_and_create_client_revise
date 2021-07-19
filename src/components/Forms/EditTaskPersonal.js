import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from '../SharedComponents/TextArea'


const EditTaskPersonal = ({ description }) => {

    const dispatch = useDispatch()
    const formData = useSelector(state => state.form.newTask)

    useEffect(() => {
        dispatch({ type: "UPDATE_TASK_INPUT", payload: { name: "description", value: description } })
        return () => {
            dispatch({ type: "RESET_FORM" } )
        }
    }, [])
    

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

export default EditTaskPersonal