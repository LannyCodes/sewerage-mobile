import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let taskList = null // 缓存请求数据
const getTaskList = (state = [], action) => {
    if (action.type === Urls.Inspections.getTaskList) {
        taskList = action.data
        return taskList
    }
    return taskList
};


let inspectionDetail = null;// 缓存请求数据
const getInspectionDetail = (state = [], action) => {
    if (action.type === Urls.Inspections.getInspectionDetail) {
        inspectionDetail = action.data
        return inspectionDetail
    }
    return inspectionDetail
};


export default combineReducers({
    getTaskList,
    getInspectionDetail
});

