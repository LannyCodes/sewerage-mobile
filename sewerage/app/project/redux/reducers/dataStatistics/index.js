import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";

let inspectionStatistics = [];
const getInspectionDatas = (state = [], action) => {
    if (action.type === Urls.statistics.inspectionStatistics) {
        inspectionStatistics = action.data;
        return inspectionStatistics
    }
    return inspectionStatistics;
}

let maintenanceStatistics = [];
const getMaintenanceDatas = (state = [], action) => {
    if (action.type === Urls.statistics.maintenanceStatistics) {
        maintenanceStatistics = action.data;
        return maintenanceStatistics
    }
    return maintenanceStatistics
}

let stationStatistics = [];
const getStationDatas = (state = [], action) => {
    if (action.type === Urls.statistics.stationStatistics) {
        stationStatistics = action.data;
        return stationStatistics
    }
    return stationStatistics
}

export default combineReducers({
    getInspectionDatas,
    getMaintenanceDatas,
    getStationDatas,
})