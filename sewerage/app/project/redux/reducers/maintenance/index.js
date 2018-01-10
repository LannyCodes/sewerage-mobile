import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let maintenanceTask = []; // 维保任务数据
const getMaintenanceTask= (state = [], action) => {
    if (action.type === Urls.Maintenance.getMaintenanceTask) {
        maintenanceTask = action.data;
        return maintenanceTask
    }
    return maintenanceTask
};

export default combineReducers({
    getMaintenanceTask
});

