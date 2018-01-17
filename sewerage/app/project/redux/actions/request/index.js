import ActionType from "../../actionType";
import {config, USER_KEY} from "../../../../config/setting";
import api from "../../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE, Status, header} from "../../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";
import * as Utils from "../../../../core/utils";
import _ from 'lodash'

const fetchData = (context, url, body, dispatch, fn) => {
    if (!_.isNull(fn) && fn === 'get') {
        get(context, url, body, dispatch);
    } else {
        post(context, url, body, dispatch);
    }
}

const get = (context, url, body, dispatch) => {
    if (!body) {
        body = {};
    }
    Object.assign(header, {
        Authorization: _USERTOKEN_
    });
    api(config.WebServerUrl).post(url, body)
        .then((response) => {
                exec(url, response, dispatch)
            }
        );
}

const post = (context, url, body, dispatch) => {
    if (!body) {
        body = {};
    }
    Object.assign(header, {
        Authorization: _USERTOKEN_
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
                exec(url, response, dispatch)
            }
        );
};

const exec = (url, response, dispatch) => {
    console.log(response)
    const {status} = response;
    if (response.ok) {
        if (response.status && status === 200) {
            if (parseInt(response.data.code) === SUCCESS_CODE) {
                dispatch({
                    type: url,
                    data: response.data.data
                })
            } else if (parseInt(response.data.code) === TOKEN_ERROR_CODE) {
                // 这里处理token异常
                console.log('token exception');
                dispatch({
                    type: ActionType.REQUEST_STATUS,
                    data: Status.TOKEN_FAIL
                });
                Toast.message('token失效，请重新登录。')
                Utils.exitApp(context)
            } else {
                // 请求有问题
                Toast.message('请求失败,请稍后重试。')
                dispatch({
                    type: ActionType.REQUEST_STATUS,
                    data: Status.FAIL
                })
            }
        }
    } else {
        // 请求有问题
        Toast.message('请求失败,请稍后重试。')
        dispatch({
            type: ActionType.REQUEST_STATUS,
            data: Status.FAIL
        })
    }
}

export const request = (context, url, body, fn) => (dispatch) => {
    fetchData(context, url, body, dispatch, fn);
};