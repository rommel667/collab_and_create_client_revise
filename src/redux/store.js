import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import rootReducer from './reducers/rootReducer'
import { devToolsEnhancer } from 'redux-devtools-extension';

export const store = createStore(rootReducer, devToolsEnhancer())

export const persistor = persistStore(store)