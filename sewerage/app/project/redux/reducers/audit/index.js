import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";

let auditList = null;
const getAuditList = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditList) {
        auditList = action.data
        return auditList
    }
    return auditList
};

let auditGZGDDetail = null; // 故障工单审核详情
const getAuditGZGDDetail = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditDetail0) {
        auditGZGDDetail= action.data;
        return auditGZGDDetail
    }
    return auditGZGDDetail
};

let auditCKBGDetail = null; // 故障工单审核详情
const getAuditCKBGDetail = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditDetail1) {
        auditCKBGDetail= action.data;
        return auditCKBGDetail
    }
    return auditCKBGDetail
};

let auditXJDetail = null; // 故障工单审核详情
const getAuditXJDetail = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditDetail2) {
        auditXJDetail= action.data;
        return auditXJDetail
    }
    return auditXJDetail
};

let auditWBDetail = null; // 故障工单审核详情
const getAuditWBDetail = (state = [], action) => {
    if (action.type === Urls.Audit.getAuditDetail3) {
        auditWBDetail= action.data;
        return auditWBDetail
    }
    return auditWBDetail
};

export default combineReducers({
    getAuditList,
    getAuditGZGDDetail,
    getAuditCKBGDetail,
    getAuditXJDetail,
    getAuditWBDetail
});

