import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";
import ActionType from '../../actionType'

const waitAuditListRequest = (state = [], action) => {
    state = state || {
        list: [],
        isFetching: false,
        body: action.body,
    }
    let url = Urls.Audit.getWaitAuditList;
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

const doneAuditListRequest = (state = [], action) => {
    state = state || {
        list: [],
        isFetching: false,
        body: action.body,
    }
    let url = Urls.Audit.getDoneAuditList;
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

const getAuditDetail = (state = [], action) => {
    let auditDetail = null
    if (action.type === Urls.Audit.getAuditDetail) {
        auditDetail = action.data;
        return auditDetail
    }
    return auditDetail
};

export default combineReducers({
    waitAuditListRequest,
    doneAuditListRequest,
    getAuditDetail
});

