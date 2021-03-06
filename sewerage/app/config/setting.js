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
    _USERID_: '',
    _USERTOKEN_: '',
    _USERNAME_: ''
};


/**
 * 用户信息key:用户storage存取数据
 * @type {{USER_STAGE_KEY: string, USER_INFO_KEY: string}}
 */
const USER_KEY = {
    USER_STAGE_KEY: 'USERSTATEKEY',
    USER_INFO_KEY: 'USERINFOKEY'
}


if (__DEV__) {
    Object.assign(config, {
        WebServerUrl: "http://localhost:10086",
        // WebServerUrl: "http://192.168.31.177:8089", // dandan
        // WebServerUrl: "http://192.168.39.75:8089", // doujiang
        // WebServerUrl: "http://192.168.31.234:8089", // 服务器
        // ImageServer: "http://192.168.31.234:80/",//图片请求地址 （与后台字段拼接得到完整url）
        // WebServerUrl: "http://192.168.37.6:8450", // 服务器
        ImageServer: "http://192.168.37.6:8470/",//图片请求地址 （与后台字段拼接得到完整url）
    })
} else {
    Object.assign(config, {
        WebServerUrl: "http://192.168.31.239:8089",
    });
}

export { config, GLOB, USER_KEY }