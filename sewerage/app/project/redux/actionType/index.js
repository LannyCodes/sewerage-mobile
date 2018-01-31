import 'core-js'
// import { Symbol } from 'core-js/library/web/timers';

const REQUEST = {
    REQUEST_STATUS: Symbol(),
    FETCH_START:'FETCH_START',
    FETCH_END:'FETCH_END',
    REQUEST_ERROR:'REQUEST_ERROR',
};

const USER = {
    SAVE_USERS: Symbol()
};

const TAB = {
    SET_CURRENT_TAB:Symbol(),
    SET_TAB_BADGE:Symbol(),
    // CURRENT_TAB:Symbol(),
}

const FAULTS = {
    SET_WORKORDERDETAIL: Symbol(),
    CHANGE_WORKORDERLIST: Symbol(),
}

const MESSAGE = {
    MESSAGE_DELETE_ROW: Symbol(),
    MESSAGE_CHANGE_ROW: Symbol(),
}

const DATASTATISTICS = {
    
}

//这个一定要放到最后
const ActionType = {
    ...REQUEST,
    ...USER,
    ...TAB,
    ...FAULTS,
    ...MESSAGE,
    DATASTATISTICS:DATASTATISTICS
};

export default ActionType;