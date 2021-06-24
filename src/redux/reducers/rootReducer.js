import { combineReducers } from 'redux'
import userReducer from './userReducer'
import notificatioReducer from './notificationReducer'
import layoutReducer from './layoutReducer'


const rootReducer = combineReducers({
    user: userReducer,
    notification: notificatioReducer,
    layout: layoutReducer,
})

export default rootReducer