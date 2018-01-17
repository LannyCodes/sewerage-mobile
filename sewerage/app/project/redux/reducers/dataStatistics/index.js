import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";

let inspectionStatistics = [];
const getInspectionDatas = (state = [], action) => {
    if (action.type === Urls.statistics.inspectionStatistics) {
        console.log('action');
        console.log(action);
        if(action.data){
            inspectionStatistics = action.data;
            return inspectionStatistics
        }
    }
    return inspectionStatistics;
}

let maintenanceStatistics = [];
const getMaintenanceDatas = (state = [], action) => {
    if (action.type === Urls.statistics.maintenanceStatistics) {
        if(action.data){
            maintenanceStatistics = action.data;
        }
        return maintenanceStatistics
    }
    return maintenanceStatistics
}

let stationStatistics = [];
const getStationDatas = (state = [], action) => {
    if (action.type === Urls.statistics.stationStatistics) {
        if(action.data){
            stationStatistics = action.data;
        }
        return stationStatistics
    }
    return stationStatistics
}

export default combineReducers({
    getInspectionDatas,
    getMaintenanceDatas,
    getStationDatas,
})