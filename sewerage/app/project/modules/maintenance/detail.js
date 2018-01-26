import React from 'react';

import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import {Status} from "../../../config/api/api.config";
import {ErrorPage, Loading} from "../../components";
import {FlatList, ScrollView, Text, View} from "react-native";
import {Avatar, Divider, Icon} from "react-native-elements";

class MaintenanceDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let params = {ID: this.props.navigation.state.params.id};
        this.store.dispatch(Actions.request(this, Urls.Maintenance.getMaintenanceDetail, params, 'get')); // 请求
    }

    _header = () => {
        return {
            title: '维保任务详情',
        }
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => (
        <View>
            <View style={[styles.rowBetween, {height: 30}]}>
                <Text style={{color: '#666', fontSize: 15}}>{item.EQUIPMENT_NAME}</Text>
            </View>
            {item.ITEM_CONTENTS.map((item, i) => {
                let status = ['未维保', '异常', '正常', '未确定'];
                return (
                    <View key={i} style={[styles.rowBetween, {height: 30}]}>
                        <Text style={{color: '#999', fontSize: 13}}>{item.CONTENT} - {status[item.STATUS]}</Text>
                    </View>
                )
            })}
        </View>
    );

    _renderCardStatus = (status) => {
        let st = {text: '待维保', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        if (status === 0) st = {text: '待维保', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        else if (status === 1) st = {text: '正在维保', color: '#FAA346', backgroundColor: '#FEF5EB'};
        else st = {text: '维保完成', color: '#1AAD19', backgroundColor: '#E8F6E8'};
        return (
            <View style={[styles.cardStatus, {backgroundColor: st.backgroundColor}]}>
                <Text style={{color: st.color, fontSize: 12}}>{st.text}</Text>
            </View>
        )
    };


    _render() {
        const detail = this.props.maintenanceDetail;
        console.log(this.props.requestStatus)
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.detail}>
                        <View style={styles.tag1}>
                            <View style={styles.tag1}>
                                <Avatar
                                    medium
                                    rounded
                                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                                    activeOpacity={0.7}
                                />
                                <View
                                    style={{justifyContent: 'space-around', alignItems: 'flex-start', marginLeft: 20}}>
                                    <Text style={[styles.text, {fontSize: 16}]}>{detail.TASK_NUMBER}</Text>
                                    <Text
                                        style={[styles.text, {
                                            fontSize: 14,
                                            marginTop: 5
                                        }]}>截止时间：{detail.VALID_TIME}</Text>
                                </View>
                            </View>
                            {this._renderCardStatus(detail.STATUS)}
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>运营公司</Text>
                            <Text style={styles.text}>{detail.COMPANY_NAME}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>维保人</Text>
                            <Text style={styles.text}>{detail.EXE_USER_NAME}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>审核人</Text>
                            <Text style={styles.text}>{detail.CHECK_USER_NAME}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.contentTitle}>
                            <Text>维保内容</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <FlatList
                            data={detail.ITEMS}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            ItemSeparatorComponent={() => (
                                <Divider style={{backgroundColor: '#ddd'}}/>
                            )}
                        />
                    </View>
                </ScrollView>
            )
        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage/>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        maintenanceDetail: state.Maintenance.getMaintenanceDetail,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(MaintenanceDetailScreen);


const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    detail: {
        backgroundColor: 'white'
    },
    cardStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 20,
        marginTop: 10
    },
    text: {
        color: '#333333',
        fontSize: 15
    },
    tag1: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 44,
        paddingLeft: 10,
        paddingRight: 10
    },
    tip: {
        marginTop: 10,
        backgroundColor: '#ECF6FD',
        width: 45,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    tipText: {
        color: '#47A9EB',
        fontSize: 10,
    },
    content: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    contentTitle: {
        height: 44,
        marginLeft: 10,
        justifyContent: 'center'
    },
    doItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        paddingLeft: 10
    },


})
