import 'core-js'

const REQUEST = {
    REQUEST_STATUS: Symbol(),
    FETCH_START:'FETCH_START',
    REQUEST_ERROR:'REQUEST_ERROR',
};

const USER = {
    SAVE_USERS: Symbol()
};
//这个一定要放到最后
const ActionType = {
    ...REQUEST,
    ...USER
};

export default ActionType;