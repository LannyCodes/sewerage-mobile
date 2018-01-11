import {combineReducers} from 'redux';
import Maintenance from './maintenance'
import Audit from './audit'
import Inspections from './inspections'
import faults from './faults';

let MainReducer = combineReducers({
    Audit,
    Inspections,
    Maintenance,
    faults
});

module.exports = MainReducer;
