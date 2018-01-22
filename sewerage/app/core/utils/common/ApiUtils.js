import {config} from "../../../config/setting";
import api from "../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE, header} from "../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";
import * as Utils from "../index";
import _ from 'lodash'

export const fetch = (context, url, body, fn: string) => {
    return new Promise((resolve, reject) => {
        if (!_.isNull(fn) && fn === 'get') {
            get(context, url, body, resolve, reject);
        } else {
            post(context, url, body, resolve, reject);
        }
    });
};

const get = (context, url, body, resolve, reject) => {
    if (!body) {
        body = {};
    }
    Object.assign(header, {
        Authorization: _USERTOKEN_
    });
    api(config.WebServerUrl).get(url, body)
        .then((response) => {
                exec(response, resolve);
            }
        );
};

const post = (context, url, body, resolve, reject) => {
    let formData = null;
    Object.assign(header, {
        Authorization: _USERTOKEN_
    });
    if (body) {
        formData = new FormData();
        for (let prop in body) {
            if (Array.isArray(body[prop])) {
                for (let value of body[prop]) {
                    formData.append(prop, value);
                }
            } else {
                formData.append(prop, body[prop]);
            }
        }
    }
    api(config.WebServerUrl).post(url, formData && {})
        .then((response) => {
                exec(response, resolve);
            }
        );
};


const exec = (response, resolve) => {
    const {status} = response;
    if (response.ok) {
        if (response.status && status === 200) {
            if (parseInt(response.data.code) === SUCCESS_CODE) {
                resolve(response.data.data)
            } else if (parseInt(response.data.code) === TOKEN_ERROR_CODE) {
                // 这里处理token异常
                Toast.message('token失效，请重新登录。');
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