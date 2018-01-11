import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let taskList = [] // 缓存请求数据
const getTaskList = (state = [], action) => {
    if (action.type === Urls.Inspections.getTaskList) {
        taskList = action.data
        return taskList
    }
    return taskList
};

export default combineReducers({
    getTaskList
});

