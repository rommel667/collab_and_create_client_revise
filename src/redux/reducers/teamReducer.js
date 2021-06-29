const initialState = {
    verifiedTeams: [],
    unverifiedTeams: [],
    newTeamForm: {
        teamName: "",
        members: []
    }
}


const team = (state = initialState, action) => {
    switch (action.type) {
        case "VERIFIED_TEAMS": {
            return {
                ...state,
                verifiedTeams: action.payload.verifiedTeams
            }
        }
        case "NEW_TEAM": {
            return {
                ...state,
                verifiedTeams: [ action.payload.newTeam, ...state.verifiedTeams ]
            }
        }
        case "UNVERIFIED_TEAMS": {
            return {
                ...state,
                unverifiedTeams: action.payload.unverifiedTeams
            }
        }
        case "ON_CHANGE_INPUT_TEAM_NAME": {
            return {
                ...state,
                newTeamForm: {
                    ...state.newTeamForm,
                    teamName: action.payload.value
                }
            }
        }
        case "ON_CHANGE_INPUT_TEAM_MEMBERS": {
            return {
                ...state,
                newTeamForm: {
                    ...state.newTeamForm,
                    members: action.payload.items
                }
            }
        }
        case "RESET_NEW_TEAM_FORM": {
            return {
                ...state,
                newTeamForm: {
                    ...initialState.newTeamForm
                }
            }
        }
        case "NEW_TEAM_SUBSCRIPTION": {
            return {
                ...state,
                unverifiedTeams: [ action.payload.newTeam, ...state.unverifiedTeams ]
            }
        }
        default: {
            return state;
        }
    }
}

export default team