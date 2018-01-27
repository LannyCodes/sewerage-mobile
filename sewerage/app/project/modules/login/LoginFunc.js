/**
 * Created by coderxuan on 2017/5/15.
 */
import {Toast} from 'teaset'
import * as Utils from "../../../core/utils";
import _ from 'lodash'
import Urls from "../../../config/api/urls";
import {USER_KEY} from "../../../config/setting"
import md5 from 'md5'

export function checkOtp(self) {
    if (Utils.isTel(self.state.inputPhoneNum)) {
        return true
    } else {
        Toast.message('请输入正确手机号！')
    }
}

export function checkInput(self) {
    return !_.isNull(self.state.inputPwd) && !_.isNull(self.state.inputPhoneAndEmail);
}

export function checkPhoneAndOtp(self) {
    return !_.isNull(self.state.inputPhoneNum) && !_.isNull(self.state.inputVertify);
}

export function submitOtp(self) {
    if (Utils.isTel(self.state.inputPhoneNum)) {
        let params = {'telephone': self.state.inputPhoneNum, 'otp': self.state.inputVertify};
        Utils.fetch(self, Urls.Login.otp, params).then(data => {
            console.log(data);
            self.props.navigation.navigate('Modify', {tel: self.state.inputPhoneNum});
        });
    } else {
        Toast.message('请输入正确手机号！')
    }
}


/**
 * 登陆接口调用
 * @param self
 */
export async function loginSubmit(self) {
    let username = self.state.inputPhoneAndEmail;
    let password = self.state.inputPwd;
    let params = {'loginName': username, 'pwd': md5(md5(password))};
    Utils.fetch(self, Urls.Login.login, params).then((data) => {
        // 保存登录状态 --- 只保存token到localStorage
        storage.save({
            key: USER_KEY.USER_STAGE_KEY,
            data: {
                userId: data.user.userId,
                userName: data.user.userName,
                token: data.token
            }
        });
        Toast.message('登陆成功！');
        Utils.resetNavigation(self.props.navigation, 'Main');
    });
}


export function checkPwdModify(self) {
    return !_.isNull(self.state.inputNewPwd) && !_.isNull(self.state.inputEnNewPwd) && self.state.inputNewPwd === self.state.inputEnNewPwd;
}

/**
 * 修改密码
 * @param self
 */
export function modifyFinish(self) {
    let params = {newPwd: self.state.inputEnNewPwd, telephone: self.props.navigation.state.params.tel};
    Toast.message('修改成功！');
    Utils.resetNavigation(self.props.navigation, 'Login');
}