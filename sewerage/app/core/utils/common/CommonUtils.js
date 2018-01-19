import {NavigationActions} from 'react-navigation'
import {USER_KEY} from "../../../config/setting";
import * as Utils from "./index";
import Toast from "teaset/components/Toast/Toast";

export const resetNavigation = (navigation, route) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: route})
        ]
    });
    (function (options) {
        navigation.dispatch(options)
    }(resetAction))
};

/**
 *
 * @returns {boolean}
 */
let lastClickTime = 0;
export const isFastExecute = () => {
    let timeNow = new Date().getTime();
    if (timeNow - lastClickTime < 5000) {
        return true;
    }
    lastClickTime = timeNow;
    return false;
};


export const exitApp = (context)=>{
    storage.remove({
        key: USER_KEY.USER_STAGE_KEY
    });
    storage.remove({
        key: USER_KEY.USER_INFO_KEY
    });
    _USERTOKEN_ = '';
    Utils.resetNavigation(context.props.navigation, 'Login')
}
