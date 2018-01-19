import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity, Image,
} from 'react-native';
import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import {connect} from "react-redux";
import * as Actions from "../../redux/actions";
import {USER_KEY} from "../../../config/setting";
import * as Assets from '../../assets'
import {Divider, Icon} from "react-native-elements";

class MeScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = 'none';
        this.state = {
            user: {
                nickName: '',
                mobile: '',
                email: '',
                organizeName: ''
            }
        }
    }


    componentDidMount() {
        let me = this;
        this.store.dispatch(Actions.request(this, Urls.User.userInfo)); // 请求
        storage.load({key: USER_KEY.USER_INFO_KEY}).then(data => {
            me.setState({
                user: data.user
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    _render() {
        let user = this.props.user || this.state.user;
        return (
            <View style={styles.container}>
                <Image source={Assets.Home.bg} style={styles.bg}/>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Image style={styles.headerImg}
                               source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}/>
                        <Text style={styles.headerText}>{user.nickName}</Text>
                    </View>
                    <View style={{backgroundColor: 'white'}}>
                        <View style={[styles.row, styles.lineContent]}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.tel} style={styles.icon}/>
                                <Text style={styles.text}>电话</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, {color: '#333', marginRight: 10}]}>{user.mobile}</Text>
                                <Icon
                                    size={22}
                                    name={'chevron-right'}
                                    type='feather'
                                    color={'#999'}
                                />
                            </View>
                        </View>
                        <Divider style={{backgroundColor: '#efefef', marginLeft: 40}}/>
                        <View style={[styles.row, styles.lineContent]}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.email} style={styles.icon}/>
                                <Text style={styles.text}>邮箱</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.text, {color: '#333', marginRight: 10}]}>{user.email}</Text>
                                <Icon
                                    size={22}
                                    name={'chevron-right'}
                                    type='feather'
                                    color={'#999'}
                                />
                            </View>
                        </View>
                        <Divider style={{backgroundColor: '#efefef', marginLeft: 40}}/>
                        <View style={[styles.row, styles.lineContent]}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.pwd} style={styles.icon}/>
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
                        <Divider style={{backgroundColor: '#efefef', marginLeft: 40}}/>
                        <View style={[styles.row, styles.lineContent]}>
                            <View style={styles.row}>
                                <Image source={Assets.Me.about} style={styles.icon}/>
                                <Text style={styles.text}>关于</Text>
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
                    <TouchableOpacity style={styles.exit} onPress={() => {
                        Utils.exitApp(this)
                    }}>
                        <Text style={[styles.text, {color: '#FF6E61'}]}>退出</Text>
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
    },
    bg: {
        width: Utils.sw,
        height: Utils.sw,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        marginTop: -Utils.sw,
        backgroundColor: 'transparent'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Utils.sw - 100,
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
        height: 44,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between'
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