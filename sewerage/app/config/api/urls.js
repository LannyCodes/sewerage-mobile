const Urls = {
    Common: {
        fileUpload: '/api/file/upload',
        fileSave: '/api/file',
    },
    Main: {
        getAppMain: '/api/home/app', // app 首页数据api
        selectAppHomeDataByStationId: '/api/home/app/selectAppHomeDataByStationId' // App首页选择厂站
    },
    Login: {
        login: '/api/user/login',
        otp: '/app/login/otp', // TODO
        modifyPassword: '/api/home/modifyPassword'// 修改用户密码
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
        maintenancetaskDeal: '/api/maintenancetaskItem/deal',// 维保内容处理
        inspectiontaskDealDetail: '/api/inspectiontaskItem/content/detail', // 巡检内容处理详情
        maintenancetaskDealDetail: '/api/maintenancetaskItem/content/detail' // 维保内容处理详情
    },
    Audit: {
        getWaitAuditList: '/api/businessProcess/waitTaskList', // 获取待审核列表,
        getDoneAuditList: '/api/businessProcess/doneTaskList', // 获取已审核列表,
        getAuditDetail: '/api/businessProcess/taskDetail', // 获取审核详情
        checkTask: '/api/businessProcess/checkTask' // 审核
    },
    Maintenance: {
        getTaskList: '/api/maintenancetask/list', // 获取维保列表
        getMaintenanceDetail: '/api/maintenancetask/detail', // 获取维保务详情
    },
    faults: {
        faultList: '/api/breakdown/list',//故障清单
        workOrder: '/api/breakdownbill/list',//故障工单
        workOrderDetail: '/api/breakdownbill',//故障工单详情
        breakdownBillHandle: '/api/breakdownbill/handler',//故障工单处理
    },
    statistics: {
        getTotalData: '/api/dataStatistics/getTotleData',
        getInspectionDataDetailsByKey: '/api/dataStatistics/getInspectionDataDetailsByKey',
    },
    device: {
        deviceList: '/api/equipment/list',
        deviceDetail: '/app/device/detail',
    },
    User: {
        userInfo: '/api/home/getUser',
        updateEmail: '/api/home/updateUserEmail',
        updateMobile: '/api/home/updateUserMobile',
    },
    Message: {
        messageList: '/api/message/list',
        messageStatusUpdate: '/api/message/updateAppMessage',
    },
};
export default Urls