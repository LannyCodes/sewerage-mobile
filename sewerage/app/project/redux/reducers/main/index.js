import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";
let mainData = {};
const getAppMain = (state, action) => {
    state = state || {
        TYPES: [],
        STATIONS: [],
    }
    if (action.type === Urls.Main.getAppMain) {
        return {
            ...state,
            STATIONS: action.data.STATIONS,
            TYPES: action.data.TYPES
        }
    } else {
        return state
    }
};

export default combineReducers({
    getAppMain
});

