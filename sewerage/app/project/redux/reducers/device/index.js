import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";

let deviceList = [];
const getDeviceList = (state = [], action) => {
    if (action.type === Urls.device.deviceList) {
        deviceList = action.data.list;
    }
    return deviceList;
}

let deviceDetail = {}
const getDeviceDetail = (state=[],action)=>{
    if(action.type === Urls.device.deviceDetail){
        deviceDetail = action.data;
    }
    return deviceDetail;
}

export default combineReducers({
    getDeviceList,
    getDeviceDetail,
})