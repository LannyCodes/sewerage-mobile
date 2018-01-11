import {combineReducers} from 'redux';
import Common from './common'
import Maintenance from './maintenance'
import Audit from './audit'
import Inspections from './inspections'

let MainReducer = combineReducers({
    Common,
    Audit,
    Inspections,
    Maintenance
});

module.exports = MainReducer;
