import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";
import ActionType from '../../actionType';
import _ from 'lodash';

const faultsListRequest = (state, action) => {
    state = state || {
        isFetching: false,
        faultsList: [],
        body: action.body,
    }
    let url = Urls.faults.faultList
    switch (action.type) {
        case url + ActionType.FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case url:
            let body = action.body;
            if (action.data.list.length > 0) {
                body.pageIndex = body.pageIndex + 1;
            }
            return {
                ...state,
                isFetching: false,
                faultsList: action.data.list,
                body: body,
            }
        case url + ActionType.REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
}

const workOrderRequest = (state = [], action) => {
    state = state || {
        isFetching: false,
        workOrders: [],
        body: action.body,
    }
    let url = Urls.faults.workOrder
    switch (action.type) {
        case url + ActionType.FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case url:
            let body = action.body;
            if (action.data.list.length > 0) {
                body.pageIndex = body.pageIndex + 1;
            }
            return {
                ...state,
                isFetching: false,
                workOrders: action.data.list,
                body:body,
            }
        case url + ActionType.REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
}

let faultDetail = {}
const getFaultDetail = (state = [], action) => {
    if (action.type === Urls.faults.faultDetail) {
        faultDetail = action.data;
        return faultDetail;
    }
    return faultDetail;
}

export default combineReducers({
    faultsListRequest,
    workOrderRequest,
    getFaultDetail
})