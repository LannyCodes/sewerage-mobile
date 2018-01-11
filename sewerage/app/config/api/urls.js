const Urls = {
    Inspections: {
        getTaskList: '/app/inspection/list', // 获取巡检列表
    },
   Audit:{
        getAuditList: '/app/audit/list', // 获取巡检列表
    },
    Maintenance:{
        getMaintenanceTask: '/app/maintenance/task', // 获取维保任务
    },
    faults: {
        faultList:'/app/fault/list',//故障清单
        workOrder:'/app/fault/workOrder',//故障工单
    }
};
export default Urls