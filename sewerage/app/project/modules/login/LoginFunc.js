/**
 * Created by coderxuan on 2017/5/15.
 */
import { Toast } from 'teaset'
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import { USER_KEY } from "../../../config/setting"
import md5 from 'md5'

export function checkOtp(self) {
    if (Utils.isTel(self.state.inputPhoneNum)) {
        return true
    } else {
        Toast.message('请输入正确手机号！')
    }
}

export function checkInput(self) {
    return self.state.inputPwd != '' && self.state.inputPhoneAndEmail != '';
}

export function checkPhoneAndOtp(self) {
    return self.state.inputPhoneNum !== '' && self.state.inputVertify != '';
}

export function submitOtp(self) {
    if (Utils.isTel(self.state.inputPhoneNum)) {
        let params = { 'telephone': self.state.inputPhoneNum, 'otp': self.state.inputVertify };
        Utils.fetch(self, Urls.Login.otp, params).then(data => {
            console.log(data);
            self.props.navigation.navigate('Modify', { tel: self.state.inputPhoneNum });
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
    let params = { 'loginName': username, 'pwd': md5(md5(password)) };
    Utils.fetch(self, Urls.Login.login, params).then((data) => {
        // 保存登录状态 --- 只保存token到localStorage
        storage.save({
            key: USER_KEY.USER_STAGE_KEY,
            data: {
                userId: data.user.userId,
                userName: data.user.userName,
                token: data.token,
                user: data.user
            }
        });
        Toast.message('登陆成功！');
        Utils.resetNavigation(self.props.navigation, 'Main');
    }).catch((err) => {
        err.code !== 0 && Toast.message(err.msg);
        console.log(err)
    });
}


export function checkPwdModify(self) {
    return self.state.inputNewPwd !== '' && self.state.inputEnNewPwd !== '' && self.state.inputOldPwd !== '' && self.state.inputNewPwd === self.state.inputEnNewPwd;
}

/**
 * 修改密码
 * @param self
 */
export function modifyFinish(self) {
    let params = {
        'newPassword': md5(md5(self.state.inputEnNewPwd)),
        'oldPassword': md5(md5(self.state.inputOldPwd))
    };
    Utils.fetch(self, Urls.Login.modifyPassword, params).then(data => {
        console.log(data);
        Toast.message('修改成功！');
        Utils.resetNavigation(self.props.navigation, 'Login');
    }).catch(err => {
        console.log(err);
        Toast.message(err.msg)
    })
}