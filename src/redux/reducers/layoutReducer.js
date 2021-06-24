const initialState = {
    openDrawer: false
}



const layout = (state = initialState, action) => {
    
    switch(action.type) {
        case "TOGGLE_DRAWER": {
            return {
                ...state,
                openDrawer: !state.openDrawer
            }
        }
        case "SIGN_OUT_RESET_LAYOUT": {
            return {
                ...state,
                openDrawer: false
            }
        }
        default: {
            return state;
        }
    }
}

export default layout