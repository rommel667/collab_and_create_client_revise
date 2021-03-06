import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Task from './Task'

const AssignedTasks = () => {

    const { projects } = useSelector(state => state.project)
    const { user } = useSelector(state => state.user)

    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        const tempTasks = []
        projects.map(project => {
            if (project.status === "Ongoing") {
                project.taskColumns.map(column => {
                    column.tasks.map(task => {
                        if (task.inCharge.some(ic => ic._id === user._id)) {
                            tempTasks.push(task)
                        }
                        return null
                    })
                    return null
                })
            }
            return null
        })
        setTasks(tempTasks)
    }, [])

    return (
        <main className="p-3 flex flex-wrap h-full gap-3">
            {tasks?.map(task => {
                return (
                    <Task key={task._id}
                        columnId={task.columnId}
                        taskId={task._id}
                        description={task.description}
                        photo={task.createdBy.photo}
                        inCharge={task.inCharge}
                        createdAt={task.createdAt}
                    />
                )
            })}
        </main>
    )
}

export default AssignedTasks
