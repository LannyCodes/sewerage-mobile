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
 * @type {{Home: {screen: Settings}}}
 */
const Main = {
    Main: {screen: TabNav}
};


const Navigator = StackNavigator(
    {
        // ...Splash,
        ...Main,
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
