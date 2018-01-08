import {StackNavigator} from 'react-navigation';
import * as Modules from '../../project/modules';
import TabNav from "./TabNavigator";

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
    Main: {screen: TabNav}
};

const Home = {
    AuditManagement: {screen: Modules.AuditManagementScreen},
    DataStatistics: {screen: Modules.DataStatisticsScreen},
    DeviceQuery: {screen: Modules.DeviceQueryScreen},
    FaultList: {screen: Modules.FaultListScreen},
    InspectionManagement: {screen: Modules.InspectionManagementScreen},
    MaintenanceManagement: {screen: Modules.MaintenanceManagementScreen}
};

const Navigator = StackNavigator(
    {
        // ...Splash,
        ...Main,
        ...Home
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
