import {StackNavigator} from 'react-navigation';
import * as Modules from '../../project/modules';

/**
 * 欢迎页
 * @type {{Splash: {screen: SplashScreen}}}
 */
const Splash = {
    Splash: {
        screen: Modules.SplashScreen
    }
}

/**
 * 首页
 * @type {{Home: {screen: Settings}}}
 */
const Home = {
    Home: {screen: Modules.Settings}
};


const Navigator = StackNavigator(
    {
        ...Splash,
        ...Home,
    }, {
        navigationOptions: {
            header: null,
        }
    }
);

export default Navigator
