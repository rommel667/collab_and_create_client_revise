import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer'
import devReducer from './devReducer'
import projectReducer from './projectReducer'
import notificatioReducer from './notificationReducer'
import settingReducer from './settingReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'setting']
}

const rootReducer = combineReducers({
    user: userReducer,
    dev: devReducer,
    project: projectReducer,
    notification: notificatioReducer,
    setting: settingReducer,
})

export default persistReducer(persistConfig, rootReducer)