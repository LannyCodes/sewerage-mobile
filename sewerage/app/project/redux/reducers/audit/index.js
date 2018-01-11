import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";


let auditList = []
const getAuditList = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditList) {
        auditList = action.data
        return auditList
    }
    return auditList
};

export default combineReducers({
    getAuditList
});

