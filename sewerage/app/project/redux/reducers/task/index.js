import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let taskList = null; // 维保任务数据
const getTaskList= (state = [], action) => {
    if (action.type === Urls.Task.getTaskList) {
        taskList = action.data;
        return taskList
    }
    return taskList
};

export default combineReducers({
    getTaskList
});

