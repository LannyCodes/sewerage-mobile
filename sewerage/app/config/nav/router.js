import { StackNavigator } from 'react-navigation';
import * as Modules from '../../project/modules';
import TabNav from "./TabNavigator";
import QrScan from "../../project/components/qrScan";
import ChooseStation from "../../project/components/ChooseStation"

/**
 * 欢迎页
 * @type {{Splash: {screen: SplashScreen}}}
 */
const Splash = {
    Splash: {
        screen: Modules.SplashScreen
    }
};

const Login = {
    Login: { screen: Modules.LoginlScreen },
    Vertify: { screen: Modules.VertifyScreen },
    Modify: { screen: Modules.ModifyScreen },
};


/**
 * 首页
 * @type {{Main: {screen: TabNav}}}
 */
const Main = {
    Main: { screen: TabNav }
};

const Common = {
    Bridge: { screen: Modules.BridgeScreen },
    Qr: { screen: QrScan },
    ChooseStation: { screen: ChooseStation }
};

const Home = {
    AuditManagement: { screen: Modules.AuditManagementScreen },
    DataStatistics: { screen: Modules.DataStatisticsScreen },
    DeviceQuery: { screen: Modules.DeviceQueryScreen },
    FaultList: { screen: Modules.FaultListScreen },
    InspectionManagement: { screen: Modules.InspectionManagementScreen },
    MaintenanceManagement: { screen: Modules.MaintenanceManagementScreen }
};
/**
 *  巡检
 */
const Inspections = {
    InspectionDetail: { screen: Modules.InspectionDetailScreen }
};
/**
 *  维保
 */
const Maintenance = {
    MaintenanceDetail: { screen: Modules.MaintenanceDetailScreen }
};
/**
 *  审核
 */
const Audit = {
    AuditDetail: { screen: Modules.AuditDetailScreen },
};
/**
 * 任务
 */
const Task = {
    TaskList: { screen: Modules.TaskListScreen },
    TaskDetail: { screen: Modules.TaskDetailScreen },
    TaskUpload: { screen: Modules.TaskUploadScreen },
    TaskDealDetail: { screen: Modules.TaskDealDetailScreen },
}

/**
 * 故障
 */
const Fault = {
    FaultDetail: { screen: Modules.FaultDetailScreen },
    WorkOrderDetail: { screen: Modules.WorkOrderDetailScreen },
    DealWorkOrder: { screen: Modules.DealWorkOrderScreen },
};

const Device = {
    DeviceDetail: { screen: Modules.DeviceDetailScreen },
}

const Message = {
    MessageDetail: { screen: Modules.MessageDetailScreen },
}

const Navigator = StackNavigator(
    {
        // ...Splash,
        ...Common,
        ...Main,
        ...Login,
        ...Home,
        ...Maintenance,
        ...Task,
        ...Fault,
        ...Inspections,
        ...Audit,
        ...Device,
        ...Message,
    }, {
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null,
            gesturesEnabled: (() => {//可以通过this.props.navigation.setParams重新设置gesturesEnabled值
                if (navigation.state.params && navigation.state.params.gesturesEnabled !== undefined) {
                    return navigation.state.params.gesturesEnabled
                } else {
                    return true
                }
            })(),
        })
    }
)

export default Navigator
