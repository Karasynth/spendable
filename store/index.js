import { createStore } from 'redux';
import { combineReducers, applyMiddleware } from 'redux'
import spendableFactors from './spendable-factors'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/index.native';
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    spendableFactors,
});

const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)    
);

export default store;