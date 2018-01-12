import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let faultsList = []
const getFaultsList = (state=[],action)=>{
    if(action.type === Urls.faults.faultList){
        faultsList = action.data;//应该做判断
        return faultsList
    }
    return faultsList
}

let workOrders = []
const getWorkOrder = (state=[],action)=>{
    if(action.type === Urls.faults.workOrder){
        workOrders = action.data;
        return workOrders
    }
    return workOrders;
}

export default combineReducers({
    getFaultsList,
    getWorkOrder
})