const initialState = {
    taskColumns: [],
}


const task = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "TASK_COLUMNS_BY_PROJECT": {
            return {
                ...state,
                taskColumns: action.payload.taskColumns
            }
        }
        case "NEW_TASK_COLUMN": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns, action.payload.newTaskColumn ]
            }
        }
        case "EDIT_TASK_COLUMN": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns.map(column => {
                    if(column._id === action.payload.columnId) {
                        return { ...column, columnName: action.payload.columnName }
                    } else {
                        return { ...column }
                    }
                }) ]
            }
        }
        case "EDIT_TASK_COLUMN_SUBSCRIPTION": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns.map(column => {
                    if(column._id === action.payload.columnId) {
                        return { ...column, columnName: action.payload.columnName }
                    } else {
                        return { ...column }
                    }
                }) ]
            }
        }
        case "DELETE_TASK_COLUMN": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns.filter(col => col._id !== action.payload.columnId) ]
            }
        }
        case "DELETE_TASK_COLUMN_SUBSCRIPTION": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns.filter(col => col._id !== action.payload.columnId) ]
            }
        }
        case "NEW_TASK_COLUMN_SUBSCRIPTION": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns, action.payload.newTaskColumn ]
            }
        }
        case "NEW_TASK": {
            const newTaskColumns = state.taskColumns.map((col, index) => {
                if(col._id === action.payload.newTask.columnId) {
                    return { ...col, tasks: [ action.payload.newTask, ...col.tasks ] }
                } else {
                    return { ...col }
                }
            })
            return {
                ...state,
                taskColumns: [...newTaskColumns ]
            }
        }
        case "NEW_TASK_SUBSCRIPTION": {
            const newTaskColumns = state.taskColumns.map((col, index) => {
                if(col._id === action.payload.newTask.columnId) {
                    return { ...col, tasks: [ action.payload.newTask, ...col.tasks ] }
                } else {
                    return { ...col }
                }
            })
            return {
                ...state,
                taskColumns: [...newTaskColumns ]
            }
        }
        case "MOVE_TASK_COLUMN_SUBSCRIPTION": {
            const newTaskColumns = action.payload.newSequenceIds.map((seq, index) => {
                const column = state.taskColumns.find(column => column._id === seq)
                return { ...column, sequence: index + 1 }
            })
            return {
                ...state,
                taskColumns: [...newTaskColumns ]
            }
        }
        case "MOVE_TASK_SUBSCRIPTION": {
            const { sourceColumnId, destinationColumnId, taskId } = action.payload
            const task = state.taskColumns.find(col => col._id === sourceColumnId).tasks.find(task => task._id === taskId)

            const newTaskColumns = state.taskColumns.map(column => {
                if(column._id === sourceColumnId) {
                    return { ...column, tasks: [ ...column.tasks.filter(task => task._id !== taskId) ] }
                } else if (column._id === destinationColumnId) {
                    return { ...column, tasks: [ task, ...column.tasks ] }
                } else {
                    return { ...column }
                }
            })
            return {
                ...state,
                taskColumns: [...newTaskColumns ]
            }
        }
        case "ON_DRAG_END_TASK_COLUMN": {
            const newTaskColumns = action.payload.newColumnOrder.map((col, index) => {
                return { ...col, sequence: index + 1 }
            })
            return {
                ...state,
                taskColumns: [...newTaskColumns ]
            }
        }
        case "ON_DRAG_END_TASK": {
            return {
                ...state,
                taskColumns: [...action.payload.newTaskColumns ]
            }
        }
        
        default: {
            return state;
        }
    }
}

export default task