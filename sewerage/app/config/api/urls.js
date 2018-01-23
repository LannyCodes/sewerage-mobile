const Urls = {
    Common: {
        fileUpload: '/api/file/upload',
        fileSave: '/api/file',
    },
    Login: {
        login: '/api/user/login',
        otp: '/app/login/otp',
        inspection: '/api/inspectiontask/list',
    },
    Inspections: {
        getTaskList: '/api/inspectiontask/list', // 获取巡检列表， get
        getInspectionDetail: '/api/inspectiontask/detail', // 获取巡检任务详情
    },
    Task: {
        getTaskList: '/api/home/scan', // 扫码-获取任务列表
        getInspectionTaskDetail: '/api/inspectiontaskItem', // 扫码 获取巡检任务详情
        getMaintenanceTaskDetail: '/api/maintenancetaskItem', // 扫码 获取维保任务详情
        inspectiontaskDeal: '/api/inspectiontaskItem/deal', // 巡检内容处理
        maintenancetaskDeal: '/api/maintenancetaskItem/deal' // 维保内容处理
    },
    Audit: {
        getAuditList: '/app/audit/list', // 获取巡检列表,
        getAuditDetail0: '/app/audit/detail/0', // 获取故障工单审核详情
        getAuditDetail1: '/app/audit/detail/1', // 获取仓库变更审核详情
        getAuditDetail2: '/app/audit/detail/2', // 获取巡检任务审核详情
        getAuditDetail3: '/app/audit/detail/3', // 获取维保任务审核详情
    },
    Maintenance: {
        getMaintenanceList: '/app/maintenance/list', // 获取维保列表
    },
    faults: {
        faultList: '/api/breakdown/list',//故障清单
        workOrder: '/api/breakdownbill/list',//故障工单
        faultDetail: '/app/fault/listDetail',//故障清单详情
    },
    statistics: {
        inspectionStatistics: '/app/statistics/inspection',
        maintenanceStatistics: '/app/statistics/maintenance',
        stationStatistics: '/app/statistics/station',
    },
    device: {
        deviceList: '/app/device/list',
        deviceDetail: '/app/device/detail',
    },
    User: {
        userInfo: '/app/user/info'
    }
};
export default Urls