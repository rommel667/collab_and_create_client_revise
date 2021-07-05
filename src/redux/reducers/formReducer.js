const initialState = {
    newTeam: {
        teamName: "",
        members: []
    },
    newProject: {
        projectName: "",
        description: "",
        unconfirmMembers: [],
        techStacks: [],
    },
    newTaskColumn: {
        columnName: "",
        projectId: ""
    },
    newTask: {
        description: "",
        inCharge: [],
        columnId: "",
        projectId: ""
    },
}


const form = (state = initialState, action) => {

    switch (action.type) {
        // FOR NEW TEAM
        case "ON_CHANGE_INPUT_TEAM_NAME": {
            return {
                ...state,
                newTeam: {
                    ...state.newTeam,
                    teamName: action.payload.value
                }
            }
        }
        case "ON_CHANGE_INPUT_TEAM_MEMBERS": {
            return {
                ...state,
                newTeam: {
                    ...state.newTeam,
                    members: action.payload.items
                }
            }
        }
        

        // FOR NEW PROJECT
        case "UPDATE_PROJECT_INPUT": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "SELECT_MEMBERS": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    unconfirmMembers: action.payload.items
                }
            }
        }
        case "SELECT_TECH_STACKS": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    techStacks: action.payload.items
                }
            }
        }

        //FOR NEW TASK COLUMN
        case "UPDATE_TASK_COLUMN_INPUT": {
            return {
                ...state,
                newTaskColumn: {
                    ...state.newTaskColumn,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "UPDATE_PROJECT_ID": {
            return {
                ...state,
                newTaskColumn: {
                    ...state.newTaskColumn,
                    projectId: action.payload.projectId
                },
                newTask: {
                    ...state.newTask,
                    projectId: action.payload.projectId
                }
            }
        }

        //FOR NEW TASK
        case "UPDATE_TASK_INPUT": {
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "SELECT_IN_CHARGE": {
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    inCharge: action.payload.items.map(item => item.value)
                }
            }
        }
        case "TASK_COLUMN_ID": {
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    columnId: action.payload.columnId
                }
            }
        }


        //FOR ALL FORMS
        case "RESET_FORM": {
            return {
                ...state,
                newTeam: { ...initialState.newTeam }, 
                newProject: { ...initialState.newProject },
                newTaskColumn: {
                    ...state.newTaskColumn,
                    columnName: ""
                },
                newTask: {
                    ...state.newTask,
                    description: "",
                    inCharge: [],
                },
            }
        }
        default:
            return state;
    }
}


export default form