/**
 * 项目名（同app.json里的name值要一致）
 * node 运行项目路径下script/dev.js会自动修改，不需要手动修改。
 * @type {{$AppProjectName: string}}
 */
const config = {
    $AppProjectName: 'sewerage'
};

/**
 * 项目全局变量初始化（默认userId，token，有需要自己添加）
 * @type {{_USERID_: string, _USERTOKEN_: string}}
 */
const GLOB = {
    _USERID_: 'userID',
    _USERTOKEN_: 'token'
};

/**
 * 用户信息key:用户storage存取数据
 * @type {{USERSTAGE_KEY: string}}
 */
const USER_KEY = {
    USERSTAGE_KEY: 'INFROREUSERSTATEKEY',
};

if (__DEV__) {
    Object.assign(config, {
        WebServerUrl: "http://192.168.39.231:10086",
    })
} else {
    Object.assign(config, {
    });
}

export { config, GLOB, USER_KEY }