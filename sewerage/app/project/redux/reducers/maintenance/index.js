import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";
import ActionType from '../../actionType'

const taskListRequest = (state = [], action) => {
    state = state || {
        list: [],
        isFetching: false,
        body: action.body,
    }
    let url = Urls.Maintenance.getTaskList;
    switch (action.type) {
        case url + ActionType.FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case url:
            let body = action.body;
            let list = state.list;
            if (action.data.list && action.data.list.length > 0) {
                body.pageIndex = body.pageIndex + 1;
                if (body.pageIndex === 2) {
                    return {
                        ...state,
                        isFetching: false,
                        list: action.data.list,
                        body: body,
                    }
                }
                return {
                    ...state,
                    isFetching: false,
                    list: list ? list.concat(action.data.list) : action.data.list,
                    body: body,
                }
            } else {
                return {
                    ...state,
                    isFetching: false,
                }
            }
        case url + ActionType.REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
};

let maintenanceDetail = null; // 缓存请求数据
const getMaintenanceDetail = (state = [], action) => {
    if (action.type === Urls.Maintenance.getMaintenanceDetail) {
        maintenanceDetail = action.data
        return maintenanceDetail
    }
    return maintenanceDetail
};


export default combineReducers({
    taskListRequest,
    getMaintenanceDetail
});

