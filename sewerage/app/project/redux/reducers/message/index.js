import { combineReducers } from 'redux';
import Urls from "../../../../config/api/urls";
import ActionType from '../../actionType';

const messageRequest = (state, action) => {
    state = state || {
        list: [],
        totalCount: 0,
        isFetching: false,
        body: action.body,
    }
    let url = Urls.Message.messageList;
    switch (action.type) {
        case url + ActionType.FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case url:
            let body = action.body;
            let list = [];
            if (body.pageIndex === 1) {
                list = action.data.list
            } else {
                list = state.list.concat(action.data.list || []);
            }
            if (action.data.list !== null && action.data.list != undefined && action.data.list.length > 0) {
                body.pageIndex = body.pageIndex + 1;
            }
            
            return {
                ...state,
                isFetching: false,
                list: list,
                body: body,
                totalCount: action.totalCount
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
    messageRequest,
})