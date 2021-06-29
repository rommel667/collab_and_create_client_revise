const initialState = {
    colleagues: [],
    suggestions: [],
    pendingInvitesRequest: [],
    pendingInvitesRespond: [],

    recentInvites: [],
    recentAccepts: [],
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
                pendingRequest: state.pendingRequest.filter(request => request._id !== action.payload.cancelRequest._id)
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
                pendingRespond: state.pendingRespond.filter(respond => respond._id !== action.payload.rejectInvite._id)
            }
        }


        //SUBSCRIPTIONS
        case "SEND_INVITE_SUBSCRIPTION": {
            if (state.pendingRespond.some(res => res._id === action.payload.newForRespond._id)) {
                return { ...state }
            } else {
                return {
                    ...state,
                    pendingRespond: [action.payload.newForRespond, ...state.pendingRespond]
                }
            }
        }
        case "CANCEL_REQUEST_SUBSCRIPTION": {
            return {
                ...state,
                pendingRespond: state.pendingRespond.filter(res => res._id !== action.payload.cancelForRespond._id)
            }
        }
        case "ACCEPT_INVITE_SUBSCRIPTION": {
            return {
                ...state,
                colleagues: [ action.payload.acceptInvite, ...state.colleagues ],
                pendingRequest: state.pendingRequest.filter(req => req._id !== action.payload.acceptInvite._id)
            }
        }
        case "REJECT_INVITE_SUBSCRIPTION": {
            return {
                ...state,
                pendingRequest: state.pendingRequest.filter(req => req._id !== action.payload.rejectInvite._id)
            }
        }

        default: {
            return state;
        }
    }
}

export default dev