import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer'
import devReducer from './devReducer'
import teamReducer from './teamReducer'
import projectReducer from './projectReducer'
import notificatioReducer from './notificationReducer'
import settingReducer from './settingReducer'
import formReducer from './formReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'setting']
}

const rootReducer = combineReducers({
    user: userReducer,
    dev: devReducer,
    team: teamReducer,
    project: projectReducer,
    notification: notificatioReducer,
    setting: settingReducer,
    form: formReducer,
})

export default persistReducer(persistConfig, rootReducer)