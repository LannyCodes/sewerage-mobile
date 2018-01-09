import {TOKEN_ERROR} from "../api.config";

export function tokenInterceptHandle(code) {
    if (code === TOKEN_ERROR.code) {
        // 错误
    } else {
        return false;
    }
}
