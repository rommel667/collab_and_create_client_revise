const initialState = {
    projects: null,
}


const project = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "PROJECTS_BY_USER": {
            const projectsClone = [...action.payload.projects]
            const sortedProjects = projectsClone.sort((a, b) => {
                const d1 = new Date(a.createdAt)
                const d2 = new Date(b.createdAt)
                return d1.getTime() - d2.getTime()
            })
            return {
                ...state,
                projects: [ ...sortedProjects ]
            }
        }
        case "NEW_PROJECT": {
            const projectsClone = [...state.projects, action.payload.newProject]
            const sortedProjects = projectsClone.sort((a, b) => {
                const d1 = new Date(a.createdAt)
                const d2 = new Date(b.createdAt)
                return d1.getTime() - d2.getTime()
            })
            return {
                ...state,
                projects: [ ...sortedProjects ]
            }
        }
        // case "ACCEPT_PROJECT_INVITE": {
        //     const projectsClone = [...state.projects, action.payload.project]
        //     const sortedProjects = projectsClone.sort((a, b) => {
        //         const d1 = new Date(a.createdAt)
        //         const d2 = new Date(b.createdAt)
        //         return d1.getTime() - d2.getTime()
        //     })
        //     return {
        //         ...state,
        //         projects: [ ...sortedProjects ]
        //     }
        // }
        case "ACCEPT_PROJECT_INVITE_SUBSCRIPTION": {
            return {
                ...state,
                projects: [ ...action.payload.projects ]
            }
        }
        default: {
            return state;
        }
    }
}

export default project