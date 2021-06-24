const initialState = {
    projects: null,
}


const project = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "FETCH_PROJECTS": {
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
        default: {
            return state;
        }
    }
}

export default project