import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let maintenanceList = null; // 维保列表数据
const getMaintenanceList= (state = [], action) => {
    if (action.type === Urls.Maintenance.getMaintenanceList) {
        maintenanceList = action.data;
        return maintenanceList
    }
    return maintenanceList
};


export default combineReducers({
    getMaintenanceList
});

