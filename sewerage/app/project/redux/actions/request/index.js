import ActionType from "../../actionType";
import { config, USER_KEY } from "../../../../config/setting";
import api from "../../../../config/api/api";
import { SUCCESS_CODE, TOKEN_ERROR_CODE, Status, header } from "../../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";
import * as Utils from "../../../../core/utils";
import _ from 'lodash'

const fetchData = (context, url, body, dispatch, fn) => {
    if (!_.isNull(fn) && fn === 'get') {
        getFetch(context, url, body, dispatch);
    } else {
        postFetch(context, url, body, dispatch);
    }
}

const getFetch = (context, url, body, dispatch) => {
    if (!body) {
        body = {};
    }
    Object.assign(header, {
        Authorization: _USERTOKEN_
    });
    dispatch({
        type: url + ActionType.FETCH_START,
    })
    api(config.WebServerUrl).get(url, body)
        .then((response) => {
            exec(url, response,body, dispatch)
        }
        );
}

const postFetch = (context, url, body, dispatch) => {
    Object.assign(header, {
        Authorization: _USERTOKEN_
    });
    let formData = null;
    if (body) {
        for (let prop in body) {
            if (Array.isArray(body[prop])) {
                for (let value of body[prop]) {
                    formData.append(prop, value);
                }
            } else {
                formData.append(prop, body[prop]);
            }
        }
    } else {
        body = {}
    }
    dispatch({
        type: url + ActionType.FETCH_START,
    })
    api(config.WebServerUrl).post(url, formData && {})
        .then((response) => {
            exec(url, response, body, dispatch)
        }
        ).catch(err => {
            console.log(err);
        });
};

const exec = (url, response, body, dispatch) => {
    console.log(response)
    const { status } = response;
    if (response.ok) {
        if (response.status && status === 200) {
            if (parseInt(response.data.code) === SUCCESS_CODE) {
                dispatch({
                    type: url,
                    data: response.data.data,
                    body: body,
                })
            } else if (parseInt(response.data.code) === TOKEN_ERROR_CODE) {
                // 这里处理token异常
                console.log('token exception');
                dispatch({
                    type: ActionType.REQUEST_STATUS,
                    data: Status.TOKEN_FAIL
                });
                dispatch({
                    type: url + ActionType.REQUEST_ERROR
                })
                Toast.message('token失效，请重新登录。')
                Utils.exitApp(context)
            } else {
                // 请求有问题
                Toast.message('请求失败,请稍后重试。')
                // dispatch({
                //     type: ActionType.REQUEST_STATUS,
                //     data: Status.FAIL
                // })
                dispatch({
                    type: url + ActionType.REQUEST_ERROR
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

export const get = (context, url, body) => (dispatch) => {
    getFetch(context, url, body, dispatch);
}

export const post = (context, url, body) => (dispatch) => {
    postFetch(context, url, body, dispatch);
}

export const request = (context, url, body, fn) => (dispatch) => {
    body = typeof (body) === 'object' ? body : {};
    fetchData(context, url, body, dispatch, fn);
};