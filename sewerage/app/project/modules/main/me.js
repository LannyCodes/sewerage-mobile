import React, { Component } from 'react';
import {
    View,
    Text, TouchableOpacity, Image,
} from 'react-native';
import { WrapScreen } from "../wrap";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import { connect } from "react-redux";
import * as Actions from "../../redux/actions";
import { USER_KEY } from "../../../config/setting";
import { Dialog } from '../../components'
import * as Assets from '../../assets'
import { Divider, Icon } from "react-native-elements";
import _ from 'lodash'
import Toast from "teaset/components/Toast/Toast";
class MeScreen extends WrapScreen {

    componentWillMount() {
        this._refresh()
    }

    _refresh = () => {
        this.store.dispatch(Actions.get(this, Urls.User.userInfo))
    }

    _header = () => 'none';

    _render() {
        let me = this;
        let user = this.props.user || {
            nickName: 'unknown',
            mobile: '',
            email: '',
            organizeName: ''
        };
        return (
            <View style={styles.container}>
                <Image source={Assets.Me.bg} style={styles.bg} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Image style={styles.headerImg}
                            source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }} />
                        <Text style={styles.headerText}>{user.nickName}</Text>
                    </View>
                    <View style={[styles.row, styles.lineContent, { marginTop: -18, backgroundColor: 'transparent' }]}>
                        <View style={styles.row}>
                            <Image source={Assets.Me.company} style={styles.icon} />
                            <Text style={[styles.text, { color: '#cccccc' }]}>{user.organizeName}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#F3F3F3' }}>
                        <TouchableOpacity style={[styles.row, styles.lineContent, { marginTop: 12 }]} onPress={() => {
                            Dialog.showInput('修改手机号', '请输入11位手机号', (input) => {
                                if (!Utils.isTel(input)) {
                                    Toast.message('请确认手机号是否输入正确！', 'short', 'center');
                                    return true;
                                } else {
                                    // 修改 
                                    let params = { 'mobile': input }
                                    Utils.fetch(me, Urls.User.updateMobile, params).then((data) => {
                                        console.log(data)
                                        me._refresh()
                                    }).catch((err) => {
                                        console.log(err)
                                        Toast.message('修改失败');
                                    });
                                    return false
                                }
                            }, () => { }, 'number-pad')
                        }}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.tel} style={styles.icon} />
                                <Text style={styles.text}>电话</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, { color: '#333', marginRight: 10 }]}>{user.mobile}</Text>
                                <Icon
                                    size={22}
                                    name={'chevron-right'}
                                    type='feather'
                                    color={'#999'}
                                />
                            </View>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: '#efefef', marginLeft: 40 }} />
                        <TouchableOpacity style={[styles.row, styles.lineContent]} onPress={() => {
                            Dialog.showInput('修改Email', '请输入Email地址', (input) => {
                                if (!Utils.isMail(input)) {
                                    Toast.message('请确认Email是否输入正确！', 'short', 'center');
                                    return true;
                                } else {
                                    // 修改
                                    let params = { 'email': input };
                                    Utils.fetch(me, Urls.User.updateEmail, params).then((data) => {
                                        console.log(data)
                                        me._refresh()
                                    }).catch((err) => {
                                        console.log(err)
                                        Toast.message('修改失败');
                                    });
                                    return false
                                }
                            }, () => { }, 'email-address')
                        }}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.email} style={styles.icon} />
                                <Text style={styles.text}>邮箱</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, { color: '#333', marginRight: 10 }]}>{user.email}</Text>
                                <Icon
                                    size={22}
                                    name={'chevron-right'}
                                    type='feather'
                                    color={'#999'}
                                />
                            </View>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: '#efefef', marginLeft: 40 }} />
                        <View style={[styles.row, styles.lineContent]}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.pwd} style={styles.icon} />
                                <Text style={styles.text}>修改密码</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon
                                    size={22}
                                    name={'chevron-right'}
                                    type='feather'
                                    color={'#999'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
                    <TouchableOpacity style={styles.exit} onPress={() => {
                        Utils.exitApp(this)
                    }}>
                        <Text style={[styles.text, { color: '#FF6E61' }]}>退出</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.Me.getUserInfo,
    }
}

export default connect(mapStateToProps)(MeScreen);


const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    bg: {
        width: Utils.sw,
        height: Utils.sw * 260 / 357,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        marginTop: -Utils.sw * 260 / 357,
        backgroundColor: 'transparent'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Utils.sw * 260 / 357,
    },
    headerImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
    },
    headerText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10
    },
    lineContent: {
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    text: {
        color: '#666',
        fontSize: 16
    },
    exit: {
        backgroundColor: 'white',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }
});