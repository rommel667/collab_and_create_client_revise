const initialState = {
    colleagues: [],
    suggestions: [],
    pendingInvitesRequest: [],
    pendingInvitesRespond: [],

    recentInvites: [],
    recentAccepts: [],

    colleagueInfo: null
}


const dev = (state = initialState, action) => {
    switch (action.type) {
        case "COLLEAGUES": {
            return {
                ...state,
                colleagues: action.payload.colleagues
            }
        }

        //SUGGESTIONS
        case "SUGGESTIONS": {
            return {
                ...state,
                suggestions: action.payload.suggestions
            }
        }
        case "SEND_INVITE": {
            return {
                ...state,
                recentInvites: [...state.recentInvites, action.payload.newInvite._id]
            }
        }
        case "CANCEL_REQUEST_ON_SUGGESTIONS": {
            return {
                ...state,
                recentInvites: state.recentInvites.filter(id => id !== action.payload.cancelRequest._id)
            }
        }

        //INVITE REQUEST
        case "PENDING_INVITES_REQUEST": {
            return {
                ...state,
                pendingInvitesRequest: action.payload.pendingInvitesRequest
            }
        }
        case "CANCEL_REQUEST_ON_PENDING": {
            return {
                ...state,
                pendingInvitesRequest: state.pendingInvitesRequest.filter(request => request._id !== action.payload.cancelRequest._id)
            }
        }

        //INVITE RESPOND
        case "PENDING_INVITES_RESPOND": {
            return {
                ...state,
                pendingInvitesRespond: action.payload.pendingInvitesRespond
            }
        }
        case "RESPOND_ACCEPT_INVITE": {
            return {
                ...state,
                colleagues: [ action.payload.acceptInvite, ...state.colleagues ],
                recentAccepts: [ action.payload.acceptInvite._id, ...state.recentAccepts ]
            }
        }
        case "RESPOND_REJECT_INVITE": {
            return {
                ...state,
                pendingInvitesRespond: state.pendingInvitesRespond.filter(respond => respond._id !== action.payload.rejectInvite._id)
            }
        }


        //SUBSCRIPTIONS
        case "SEND_INVITE_SUBSCRIPTION": {
            if (state.pendingInvitesRespond.some(res => res._id === action.payload.newForRespond._id)) {
                return { ...state }
            } else {
                return {
                    ...state,
                    pendingInvitesRespond: [action.payload.newForRespond, ...state.pendingInvitesRespond]
                }
            }
        }
        case "CANCEL_REQUEST_SUBSCRIPTION": {
            return {
                ...state,
                pendingInvitesRespond: state.pendingInvitesRespond.filter(res => res._id !== action.payload.cancelForRespond._id)
            }
        }
        case "ACCEPT_INVITE_SUBSCRIPTION": {
            return {
                ...state,
                colleagues: [ action.payload.acceptInvite, ...state.colleagues ],
                pendingInvitesRequest: [ ...state.pendingInvitesRequest.filter(req => req._id !== action.payload.acceptInvite._id) ],
                recentInvites: state.recentInvites.filter(id => id !== action.payload.acceptInvite._id),
                suggestions: state.suggestions.filter(suggestion => suggestion._id !== action.payload.acceptInvite._id),
            }
        }
        case "REJECT_INVITE_SUBSCRIPTION": {
            return {
                ...state,
                pendingInvitesRequest: [ ...state.pendingInvitesRequest.filter(req => req._id !== action.payload.rejectInvite._id) ]
            }
        }


        default: {
            return state;
        }
    }
}

export default dev