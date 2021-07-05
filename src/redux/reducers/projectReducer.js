const initialState = {
    projects: null,
}


const project = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "PROJECTS_BY_USER": {
            const projectsClone = [ ...action.payload.projects ]
            const sortedProjects = projectsClone.sort( (a, b) => {
                const d1 = new Date(a.createdAt)
                const d2 = new Date(b.createdAt)
                return d1.getTime() - d2.getTime()
            } )
            return {
                ...state,
                projects: sortedProjects
            }
        }
        case "NEW_PROJECT": {
            return {
                ...state,
                projects: [ ...state.projects, action.payload.newProject ]
            }
        }
        case "TASK_COLUMNS_BY_PROJECT": {
            const updateProject = state.projects.map(project => {
                if(project._id === action.payload.projectId) {
                    return { ...project, taskColumns: action.payload.taskColumns }
                } else {
                    return { ...project }
                }
            })
            return {
                ...state,
                projects: [ ...updateProject ]
            }
        }
        case "NEW_TASK_COLUMN": {
            const updateProject = state.projects.map(project => {
                if(project._id === action.payload.newTaskColumn.projectId) {
                    return { ...project, taskColumns: [ ...project.taskColumns, action.payload.newTaskColumn ]  }
                } else {
                    return { ...project }
                }
            })
            return {
                ...state,
                projects: [ ...updateProject ]
            }
        }
        case "NEW_TASK": {
            const updateProject = state.projects.map(project => {
                if(project._id === action.payload.newTask.projectId) {
                    return {
                        ...project,
                        taskColumns: project.taskColumns.map(column => {
                            if(column._id === action.payload.newTask.columnId) {
                                return { ...column, tasks: [ ...column.tasks, action.payload.newTask ] }
                            } else {
                                return { ...column }
                            }
                        })
                    }
                } else {
                    return { ...project }
                }
            })
            return {
                ...state,
                projects: [ ...updateProject ]
            }
        }
        case "ON_DRAG_END_TASK": {
            const updateProject = state.projects.map(project => {
                if(project._id === action.payload.projectId) {
                    return {
                        ...project,
                        taskColumns: [ ...action.payload.newTaskColumns ]
                    }
                } else {
                    return { ...project }
                }
            })
            return {
                ...state,
                projects: [ ...updateProject ]
            }
        }
        default: {
            return state;
        }
    }
}

export default project