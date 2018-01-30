/**
 * 手机号校验
 * @param obj
 * @returns {boolean}
 */
export const isTel = function (obj) {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))\d{8})$/;
    return reg.test(obj);
}


/**
 * 邮箱校验
 * @param obj
 * @returns {boolean}
 */
export const isMail = function (obj) {
    let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reg.test(obj)) {
        return false
    } else {
        return true
    }
}

/**
 * 座机校验
 * @param obj
 * @returns {boolean}
 */
export const isDeskTel = function (obj) {
    let reg = /^[0-9]{7,12}$/;
    return reg.test(obj);
}
