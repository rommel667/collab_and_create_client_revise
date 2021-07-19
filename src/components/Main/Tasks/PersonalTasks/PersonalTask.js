import React from 'react'
import TaskMenu from '../TaskMenu';

const PersonalTask = ({ columnId, taskId, description, createdAt, isDragging }) => {
  return (
    <li className={`${isDragging ? "bg-green-300" : "bg-white"} rounded-sm shadow`}>
      <div>
        <div className="bg-gray-500 flex justify-between rounded-t-sm items-center p-1">
          <p className="text-xs text-gray-300 font-normal">{new Date(createdAt).toLocaleString()}</p>
          <TaskMenu taskId={taskId} description={description} columnId={columnId} />
        </div>
        <div className="p-2">
          <div className="my-2 flex flex-wrap">
            <p className="text-sm font-medium">{description}</p>
          </div>

        </div>
      </div>

    </li>
  )
}

export default PersonalTask