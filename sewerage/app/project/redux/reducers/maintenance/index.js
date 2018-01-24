import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let taskList = null // 缓存请求数据
const getTaskList = (state = [], action) => {
    if (action.type === Urls.Maintenance.getTaskList) {
        taskList = action.data
        return taskList
    }
    return taskList
};


let maintenanceDetail = null; // 缓存请求数据
const getMaintenanceDetail = (state = [], action) => {
    if (action.type === Urls.Maintenance.getMaintenanceDetail) {
        maintenanceDetail = action.data
        return maintenanceDetail
    }
    return maintenanceDetail
};


export default combineReducers({
    getTaskList,
    getMaintenanceDetail
});

