import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useLocation } from 'react-router-dom'
import Task from './Task'
import PersonalTask from '../PersonalTasks/PersonalTask'
import ProjectTask from '../ProjectTasks/ProjectTask'

const DraggableComponent = ({ tasks, columnId }) => {

  const location = useLocation()

  return (
    tasks?.map((task, index) => {
      return (
        <Draggable
          key={task._id}
          draggableId={task._id}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...provided.draggableProps.style }}
            >
            {location.pathname.split('/')[2] === "personaltasks" ? 
            <PersonalTask
              columnId={columnId}
                taskId={task._id}
                description={task.description}
                createdAt={task.createdAt}
                isDragging={snapshot.isDragging}
                draggableStyle={provided.draggableProps.style}
            /> :
            <ProjectTask
               columnId={columnId}
                taskId={task._id}
                description={task.description}
                photo={task.createdBy.photo}
                inCharge={task.inCharge}
                createdAt={task.createdAt}
                isDragging={snapshot.isDragging}
                draggableStyle={provided.draggableProps.style}
            />}
            </div>
          )}
        </Draggable>
      )
    })
  )
}

export default DraggableComponent