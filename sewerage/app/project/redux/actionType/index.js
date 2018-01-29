import 'core-js'

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

//这个一定要放到最后
const ActionType = {
    ...REQUEST,
    ...USER,
    ...TAB,
};

export default ActionType;