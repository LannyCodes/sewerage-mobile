import {combineReducers} from 'redux';
import Request from './request'
import Maintenance from './maintenance'

let MainReducer = combineReducers({
    Request,
    Maintenance
});

module.exports = MainReducer;
