const initialState = {
    openDrawer: false,
    darkTheme: false,
}



const setting = (state = initialState, action) => {
    
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

export default setting