import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from "redux-logger";
const MainReducer = require('../reducers');
const loggerMiddleware = createLogger();
const createStoreWithThunk = applyMiddleware(thunk)(createStore, loggerMiddleware);
let store = createStoreWithThunk(MainReducer);

export default store;