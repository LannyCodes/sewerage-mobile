import {combineReducers} from 'redux';
import Common from './common'
import Maintenance from './maintenance'
import Audit from './audit'
import Inspections from './inspections'
import faults from './faults';
import Task from './task';
import dataStatistics from './dataStatistics';
import device from './device';

let MainReducer = combineReducers({
    Common,
    Audit,
    Inspections,
    Maintenance,
    faults,
    Task,
    dataStatistics,
    device,
});

module.exports = MainReducer;
