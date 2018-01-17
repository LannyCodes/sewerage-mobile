import React from 'react';

import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import {Status} from "../../../config/api/api.config";
import {ErrorPage, Loading} from "../../components";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Divider} from "react-native-elements";

class AuditGZGDDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "故障工单审核详情",
        };
        this.state = {
            status: this.props.navigation.state.params.status
        }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(this, Urls.Audit.getAuditDetail0)); // 请求
    }

    _renderCardStatus = (status) => {
        let st = {text: '待审核', color: '#FAA346', backgroundColor: '#FEF5EB'};
        if (status === '0') st = {text: '待审核', color: '#FAA346', backgroundColor: '#FEF5EB'};
        else if (status === '1') st = {text: '已通过', color: '#1AAD19', backgroundColor: '#E8F6E8'};
        else if (status === '2') st = {text: '已驳回', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        else if (status === '3') st = {text: '已废弃', color: '#FF6E61', backgroundColor: '#FFE2DF'};
        return (
            <View style={{
                width: 45,
                height: 18,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginTop: 10,
                backgroundColor: st.backgroundColor
            }}>
                <Text style={{fontSize: 10, color: st.color}}>{st.text}</Text>
            </View>
        )
    };

    _renderOperate = () => (
        <View style={styles.operate}>
            <TouchableOpacity style={styles.operateBox}>
                <Text style={styles.text}>废弃</Text>
            </TouchableOpacity>
            <View style={{height: 32, width: 0.5, backgroundColor: '#ccc'}}/>
            <TouchableOpacity style={styles.operateBox}>
                <Text style={styles.text}>驳回</Text>
            </TouchableOpacity>
            <View style={{height: 32, width: 0.5, backgroundColor: '#ccc'}}/>
            <TouchableOpacity style={styles.operateBox}>
                <Text style={styles.text}>通过</Text>
            </TouchableOpacity>
        </View>
    )
    _renderContent = (list) => {
        return (
            <View>
                <View style={[styles.rowBetween, {justifyContent: 'flex-start'}]}>
                    <View style={{backgroundColor: '#42BB55', width: 3, height: 16}}/>
                    <Text style={{fontSize: 15, color: '#666', marginLeft: 10}}>故障清单</Text>
                </View>
                {
                    list.map((item, i) => (
                        //         "deviceName": "二向箔设备一号",
                        //     "fault": "一号一体机设备电机损坏，测试结果显示断路，水泵运转一号一体机设备点击损坏，测试结果显示断路，反正是坏了。",
                        // "source": "巡检",
                        // "type": "机械故障
                        <View key={i}>
                            <View style={[styles.rowBetween, {backgroundColor: '#E8F6E8', height: 25}]}><Text
                                style={{fontSize: 12, color: '#666'}}>清单{i + 1}</Text></View>
                            <View style={{padding: 10}}>
                                <Text style={{fontSize: 15, color: '#666'}}>{item.deviceName}</Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#333',
                                    marginTop: 11,
                                    lineHeight: 20
                                }}>{item.fault}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={styles.rowBetween}>
                                <Text style={{fontSize: 15, color: '#666'}}>故障来源</Text>
                                <Text style={{fontSize: 15, color: '#333'}}>{item.source}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={styles.rowBetween}>
                                <Text style={{fontSize: 15, color: '#666'}}>故障类型</Text>
                                <Text style={{fontSize: 15, color: '#333'}}>{item.type}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }
    _keyExtractor = (item, index) => index;

    _render() {
        const detail = this.props.auditDetail;
        console.log(detail)
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.detail}>
                            <View style={styles.tag1}>
                                <View style={styles.tag1}>
                                    <View style={{justifyContent: 'space-around', alignItems: 'flex-start'}}>
                                        <Text style={[styles.text, {fontSize: 16}]}>工单编号: {detail.id}</Text>
                                        <Text
                                            style={[styles.text, {
                                                fontSize: 14,
                                                marginTop: 5
                                            }]}>发起时间：{detail.startTime}</Text>
                                    </View>
                                </View>
                                {this._renderCardStatus(this.state.status)}
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={styles.rowBetween}>
                                <Text style={[styles.text, {color: '#666'}]}>发起人</Text>
                                <Text style={styles.text}>{detail.fqperson}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={styles.rowBetween}>
                                <Text style={[styles.text, {color: '#666'}]}>责任人</Text>
                                <Text style={styles.text}>{detail.auditPerson}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={{padding: 10}}>
                                <Text style={[styles.text, {color: '#666', marginBottom: 8}]}>工单描述</Text>
                                <Text style={styles.text}>{detail.des}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            {this._renderContent(detail.list)}
                        </View>
                    </ScrollView>
                    {this.state.status === '0' && this._renderOperate()}
                </View>
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
        auditDetail: state.Audit.getAuditGZGDDetail,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(AuditGZGDDetailScreen);


const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    detail: {
        backgroundColor: 'white'
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
        backgroundColor: '#FEF5EB',
        width: 45,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    tipText: {
        color: '#FAA346',
        fontSize: 10,
    },
    content: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    operate: {
        height: 47,
        width: Utils.sw,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    operateBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
});