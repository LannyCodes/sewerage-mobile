import { StackNavigator } from 'react-navigation';
import * as Modules from '../../project/modules';
import TabNav from "./TabNavigator";
import QrScan from "../../project/components/qrScan";
import OverlayExample from "../../project/modules/inspection";

/**
 * 欢迎页
 * @type {{Splash: {screen: SplashScreen}}}
 */
const Splash = {
    Splash: {
        screen: Modules.SplashScreen
    }
};

/**
 * 首页
 * @type {{Main: {screen: TabNav}}}
 */
const Main = {
    Main: { screen: TabNav }
};

const Common = {
    Qr: { screen: QrScan }
}

const Home = {
    AuditManagement: { screen: Modules.AuditManagementScreen },
    DataStatistics: { screen: Modules.DataStatisticsScreen },
    DeviceQuery: { screen: Modules.DeviceQueryScreen },
    FaultList: { screen: Modules.FaultListScreen },
    InspectionManagement: { screen: Modules.InspectionManagementScreen },
    MaintenanceManagement: { screen: Modules.MaintenanceManagementScreen }
};
/**
 *  维保
 */
const Maintenance = {
    MaintenanceManagement: { screen: Modules.MaintenanceManagementScreen }
};
/**
 * 任务
 */
const Task = {
    TaskList: { screen: Modules.TaskListScreen },
    TaskMaintenanceDetail: { screen: Modules.TaskMaintenanceDetailScreen },
}

/**
 * 故障
 */
const Fault = {
    FaultDetail: { screen: Modules.FaultDetailScreen },
    WorkOrderDetail: { screen: Modules.WorkOrderDetailScreen },
}

const Navigator = StackNavigator(
    {
        // ...Splash,
        ...Main,
        ...Home,
        ...Common,
        ...Maintenance,
        ...Task,
        ...Fault,
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
