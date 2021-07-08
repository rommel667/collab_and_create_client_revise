import React from 'react'
import TaskMenu from '../TaskMenu';

const Task = ({ columnId, taskId, description, photo, createdAt, inCharge, isDragging }) => {
  return (
    <li className={`${isDragging ? "bg-green-300" : "bg-white"} rounded-sm shadow`}>
      <div>
        <div className="bg-gray-500 flex justify-between rounded-t-sm items-center p-1">
          <p className="text-xs text-gray-300 font-normal">{new Date(createdAt).toLocaleString()}</p>
          <TaskMenu taskId={taskId} description={description} inCharge={inCharge} columnId={columnId} />
        </div>
        <div className="p-2">
          <div className="my-2 flex flex-wrap">
            <p className="text-sm font-medium">{description}</p>
          </div>
          <div className="flex justify-between">

            <div>
              <p className="text-xs">In Charge:</p>
              <div className="flex flex-row">
                {inCharge.map((c, i) => {
                  return (
                    <img
                    key={c._id}
                      className={`${i > 0 ? "-ml-2" : ""} h-5 w-5 rounded-full object-cover border border-white`}
                      src={c.photo} alt="profile" />
                  )
                })}
              </div>
            </div>
            <div>
              <p className="text-xs">Created by:</p>
              <img
                className="h-5 w-5 rounded-full object-cover border-white"
                src={photo} alt="profile" />
            </div>
          </div>
        </div>
      </div>

    </li>
  )
}

export default Task