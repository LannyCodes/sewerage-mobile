import { config } from "../../../config/setting";
import api from "../../../config/api/api";
import { SUCCESS_CODE, TOKEN_ERROR_CODE, header } from "../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";
import * as Utils from "../index";
import _ from 'lodash'

export const fetch = (context, url, body, fn: string) => {
    return new Promise((resolve, reject) => {
        if (!_.isNull(fn) && fn === 'get') {
            getFetch(context, url, body, resolve, reject);
        } else {
            postFetch(context, url, body, resolve, reject);
        }
    });
};

export const get = (context, url, body) => {
    return new Promise((resolve, reject) => {
        getFetch(context, url, body, resolve, reject);
    })
}

export const post = (context, url, body) => {
    return new Promise((resolve, reject) => {
        postFetch(context, url, body, resolve, reject);
    })
}

const getFetch = (context, url, body, resolve, reject) => {
    if (!body) {
        body = {};
    }
    Object.assign(header, {
        Authorization: _USERTOKEN_
    });
    api(config.WebServerUrl).get(url, body)
        .then((response) => {
            exec(context, response, resolve, reject);
        }
        );
};

const postFetch = (context, url, body, resolve, reject) => {
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
    api(config.WebServerUrl).post(url, formData || {})
        .then((response) => {
            console.log(response)
            exec(context, response, resolve, reject);
        }
        );
};


const exec = (context, response, resolve, reject) => {
    const { status } = response;
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
                // Toast.message('请求失败,请稍后重试。')
                reject(response.data);
            }
        }
    } else {
        // 请求有问题
        reject(response);
        Toast.message('请求失败,请稍后重试。')
    }
}