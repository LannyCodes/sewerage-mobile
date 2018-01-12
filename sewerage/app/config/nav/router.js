import {StackNavigator} from 'react-navigation';
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
        screen: Modules.TaskMaintenanceDetailScreen
    }
};

/**
 * 首页
 * @type {{Main: {screen: TabNav}}}
 */
const Main = {
    Main: {screen: TabNav}
};

const Common = {
    Qr: {screen: QrScan}
}

const Home = {
    AuditManagement: {screen: Modules.AuditManagementScreen},
    DataStatistics: {screen: Modules.DataStatisticsScreen},
    DeviceQuery: {screen: Modules.DeviceQueryScreen},
    FaultList: {screen: Modules.FaultListScreen},
    InspectionManagement: {screen: Modules.InspectionManagementScreen},
    MaintenanceManagement: {screen: Modules.MaintenanceManagementScreen}
};
/**
 *  巡检
 */
const Inspections = {
    InspectionDetail: {screen: Modules.InspectionDetailScreen}
};
/**
 *  维保
 */
const Maintenance = {
};
/**
 * 任务
 */
const Task = {
    TaskList: {screen: Modules.TaskListScreen},
    TaskMaintenanceDetail: {screen: Modules.TaskMaintenanceDetailScreen},
    TaskMaintenanceUpload: {screen: Modules.TaskMaintenanceUploadScreen},
}

/**
 * 故障
 */
const Fault = {
    FaultDetail: {screen: Modules.FaultDetailScreen},
    WorkOrderDetail: {screen: Modules.WorkOrderDetailScreen},
    DealWorkOrder: {screen:Modules.DealWorkOrderScreen},
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
        ...Inspections
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
