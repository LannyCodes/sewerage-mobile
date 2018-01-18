import * as Assets from '../../project/assets'

export const homeModules = [
    {
        name: '巡检管理',
        router: 'InspectionManagement',
        img: Assets.Home.xj,
    },
    {
        name: '维保管理',
        router: 'MaintenanceManagement',
        img: Assets.Home.wb,
    },
    {
        name: '审核管理',
        router: 'AuditManagement',
        img: Assets.Home.sh,
    },
    {
        name: '数据统计',
        router: 'DataStatistics',
        img: Assets.Home.sj,
    },
    {
        name: '设备查询',
        router: 'DeviceQuery',
        img: Assets.Home.sb,
    },
    {
        name: '故障工单',
        router: 'FaultList',
        img: Assets.Home.gz,
    },
];

