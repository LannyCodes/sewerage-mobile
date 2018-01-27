import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";
import ActionType from '../../actionType';
import _ from 'lodash';

const faultsListRequest = (state, action) => {
    state = state || {
        isFetching: false,
        list: [],
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
            let list = [];
            if(body.pageIndex === 1){
                list = action.data.list
            }else{
                list = state.list.concat(action.data.list || []);
            }
            if (action.data.list !== null && action.data.list.length > 0) {
                body.pageIndex = body.pageIndex + 1;
            }
            
            return {
                ...state,
                isFetching: false,
                list: list,
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
        list: [],
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
            let list = [];
            if(body.pageIndex === 1){
                list = action.data.list
            }else{
                list = state.list.concat(action.data.list || []);
            }
            if (action.data.list !== null && action.data.list.length > 0) {
                body.pageIndex = body.pageIndex + 1;
            }
            return {
                ...state,
                isFetching: false,
                list: list,
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

export default combineReducers({
    faultsListRequest,
    workOrderRequest,
})