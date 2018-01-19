import {combineReducers} from 'redux';
import Urls from "../../../../config/api/urls";
import {USER_KEY} from "../../../../config/setting";

let user = null; // 个人信息
const getUserInfo = (state = [], action) => {
    if (action.type === Urls.User.userInfo) {
        storage.save({
            key: USER_KEY.USER_INFO_KEY,
            data: {
                user: action.data,
            }
        });
        user = action.data;
        return user
    }
    return user
};


export default combineReducers({
    getUserInfo
});

