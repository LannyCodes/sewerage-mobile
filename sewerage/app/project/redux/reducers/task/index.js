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

const getMaintenanceTaskDetail = (state = [], action) => {
    let maintenanceTaskDetail = null; // 扫码 维保任务详情
    if (action.type === Urls.Task.getMaintenanceTaskDetail) {
        maintenanceTaskDetail = action.data;
        return maintenanceTaskDetail
    }
    return maintenanceTaskDetail
};

const getInspectionTaskDetail = (state = [], action) => {
    let inspectionTaskDetail = null; // 扫码 巡检任务详情
    if (action.type === Urls.Task.getInspectionTaskDetail) {
        inspectionTaskDetail = action.data;
        return inspectionTaskDetail
    }
    return inspectionTaskDetail
};

export default combineReducers({
    getTaskList,
    getMaintenanceTaskDetail,
    getInspectionTaskDetail
});

