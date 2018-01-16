import {config, USER_KEY} from "../../../config/setting";
import api from "../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE, header} from "../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";
import * as Utils from "../index";

export const fetch = (context,url, body) => {
    return new Promise((resolve, reject) => {
        if (!body) {
            body = {};
        }
        Object.assign(header, {
            token: _USERTOKEN_
        });
        let formData = new FormData();
        for (let prop in body) {
            if (Array.isArray(body[prop])) {
                for (let value of body[prop]) {
                    formData.append(prop, value);
                }
            } else {
                formData.append(prop, body[prop]);
            }
        }
        api(config.WebServerUrl).post(url, formData)
            .then((response) => {
                    console.log(response);
                    const {status} = response;
                    if (response.ok) {
                        if (response.status && status === 200) {
                            if (parseInt(response.data.code) === SUCCESS_CODE) {
                                resolve(response.data.data)
                            } else if (parseInt(response.data.code) === TOKEN_ERROR_CODE) {
                                // 这里处理token异常
                                Utils.exitApp(context)
                            } else {
                                // 请求有问题
                                Toast.message('请求失败,请稍后重试。')
                            }
                        }
                    } else {
                        // 请求有问题
                        Toast.message('请求失败,请稍后重试。')
                    }
                }
            );
    });
};