import jwtDecode from 'jwt-decode'

const initialState = {
    user: null,
    myInfo: null
}

if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token") || sessionStorage.getItem("token"))

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
    } else {
        initialState.user = decodedToken
    }
}

const user = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "LOGIN": {
            localStorage.setItem("token", action.payload.user.token)
            return {
                ...state,
                user: action.payload.user
            }
        }
        case "LOGIN_REMEMBER_ME_TRUE": {
            localStorage.setItem("token", action.payload.user.token)
            return {
                ...state,
                user: action.payload.user
            }
        }
        case "LOGIN_REMEMBER_ME_FALSE": {
            sessionStorage.setItem("token", action.payload.user.token)
            return {
                ...state,
                user: action.payload.user
            }
        }
        case "LOGOUT": {
            localStorage.removeItem("token")
            localStorage.removeItem("rememberMe")
            return {
                user: null,
            }
        }
        case "FETCH_MY_INFO": {
            return {
                ...state,
                myInfo: action.payload.myInfo,
            }
        }
        default: {
            return state;
        }
    }
}

export default user