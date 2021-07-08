import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { getItemStyle } from '../functions'
import DroppableComponent from './DroppableComponent'

const DragAndDrop = ({ onDragEnd, taskColumns, onOpenNewTaskModal, mainDropprableId }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd} className="p-3 w-full">


                <Droppable droppableId={mainDropprableId} direction="horizontal" type="column" >
                    {(provided, snapshot) => {
                        return (
                            <div
                                className={`${taskColumns.length > 4 ? "overflow-auto" : ""} ${snapshot.isDraggingOver ? "bg-blue-200" : ""} flex w-full flex-row gap-2`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <DroppableComponent
                                    setOpen={onOpenNewTaskModal}
                                    getItemStyle={getItemStyle}
                                    taskColumns={taskColumns}
                                />
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>

            </DragDropContext>
    )
}

export default DragAndDrop
