import React from 'react'
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableComponent from './DraggableComponent'
import { FaEllipsisV, FaPlus, FaFileMedical } from "react-icons/fa";
import ColumnMenu from './ColumnMenu';

const DroppableComponent = ({ taskColumns, getItemStyle, setOpen }) => {

  return (
    taskColumns.map((el, ind) => (
      <Draggable
        key={el._id}
        draggableId={el._id}
        index={ind}
      >
        {(provided, snapshot) => (
          <div

            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${taskColumns.length < 4 ? "min-w-1/2 lg:min-w-1/3" : "min-w-1/2 md:min-w-1/3 lg:min-w-1/4"} bg-gray-300 rounded-md p-2 flex flex-col h-full`}
            style={{ ...provided.draggableProps.style }}
          >
            <div className="flex flex-row justify-between items-center mb-2" {...provided.dragHandleProps}>
              {el.columnName}
              <div className="flex items-center gap-1">
                <FaFileMedical size={15} onClick={() => setOpen(el._id)} className="cursor-pointer" />
                <ColumnMenu columnName={el.columnName} columnId={el._id} />

              </div>

            </div>
            <Droppable droppableId={el._id} type="task" index={ind}>
              {(provided, snapshot) => {
                return (
                  <div
                    className={`${snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-100"} rounded-md p-1 flex-1 overflow-auto no-scrollbar`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ul className="space-y-2 flex-1">
                      <DraggableComponent tasks={el.tasks} getItemStyle={getItemStyle} columnId={el._id} />
                    </ul>
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          </div>
        )}
      </Draggable>
    ))
  )
}

export default DroppableComponent