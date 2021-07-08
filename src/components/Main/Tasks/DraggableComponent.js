import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Task from './Task'

const DraggableComponent = ({ tasks, columnId }) => {

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
              <Task
                columnId={columnId}
                taskId={task._id}
                description={task.description}
                photo={task.createdBy.photo}
                inCharge={task.inCharge}
                createdAt={task.createdAt}
                isDragging={snapshot.isDragging}
                draggableStyle={provided.draggableProps.style}
              />
            </div>
          )}
        </Draggable>
      )
    })
  )
}

export default DraggableComponent