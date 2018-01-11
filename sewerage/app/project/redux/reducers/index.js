import {combineReducers} from 'redux';
import Maintenance from './maintenance'
import Audit from './audit'
import Inspections from './inspections'

let MainReducer = combineReducers({
    Audit,
    Inspections,
    Maintenance
});

module.exports = MainReducer;
