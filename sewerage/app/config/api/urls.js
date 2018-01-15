const Urls = {
    Login: {
        login: '/api/user/login',
        otp: '/app/login/otp'
    },
    Inspections: {
        getTaskList: '/app/inspection/list', // 获取巡检列表，
        getInspectionDetail: '/app/inspection/inspectionDetail', // 获取巡检任务详情
    },
    Task: {
        getTaskList: '/app/task/list', // 获取任务列表
        getMaintenanceTaskDetail: '/app/task/maintenanceDetail', // 获取维保任务详情
    },
    Audit: {
        getAuditList: '/app/audit/list', // 获取巡检列表
    },
    Maintenance: {
        getMaintenanceList: '/app/maintenance/list', // 获取维保列表
    },
    faults: {
        faultList: '/app/fault/list',//故障清单
        workOrder: '/app/fault/workOrder',//故障工单
        faultDetail: '/app/fault/listDetail',//故障清单详情
    }
};
export default Urls