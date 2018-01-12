import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let taskList = null; // 任务列表数据
const getTaskList = (state = [], action) => {
    if (action.type === Urls.Task.getTaskList) {
        taskList = action.data;
        return taskList
    }
    return taskList
};


let maintenanceTaskDetail = null; // 维保任务详情
const getMaintenanceTaskDetail = (state = [], action) => {
    if (action.type === Urls.Task.getMaintenanceTaskDetail) {
        maintenanceTaskDetail = action.data;
        return maintenanceTaskDetail
    }
    return maintenanceTaskDetail
};

export default combineReducers({
    getTaskList,
    getMaintenanceTaskDetail
});

