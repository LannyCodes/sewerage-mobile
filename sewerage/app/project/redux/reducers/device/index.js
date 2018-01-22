import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";
import ActionType from '../../actionType';


const getDeviceList = (state = [], action) => {
    let deviceList = [];
    let isFetching = false;
    let url = Urls.device.deviceList;
    switch (action.type) {
        case url + ActionType.FETCH_START:
            isFetching = true;
            break;
        case url:
            deviceList = action.data.list;
        case url + ActionType.REQUEST_ERROR:
            isFetching = false;
            break
        default:
            isFetching = false;
            break;
    }
    // if (action.type === Urls.device.deviceList) {
    //     deviceList = action.data.list;
    // }
    return {
        deviceList: deviceList,
        isFetching: isFetching,
    };
}



let deviceDetail = {}
const getDeviceDetail = (state = [], action) => {
    if (action.type === Urls.device.deviceDetail) {
        deviceDetail = action.data;
    }
    return deviceDetail;
}

export default combineReducers({
    getDeviceList,
    getDeviceDetail,
})