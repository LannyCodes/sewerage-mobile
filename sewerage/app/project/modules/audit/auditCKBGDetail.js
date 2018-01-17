import React from 'react';

import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import {Status} from "../../../config/api/api.config";
import {ErrorPage, Loading} from "../../components";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar, Divider, Icon} from "react-native-elements";

class AuditCKBGDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "仓库变更审核详情",
        };
        this.state = {
            status: this.props.navigation.state.params.status
        }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(this, Urls.Audit.getAuditDetail1)); // 请求
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

    _keyExtractor = (item, index) => index;
    _renderContent = (type, list) => {
        // 0--同仓变更 1--异仓变更
        if (type === '0') {
            // 同仓变更
            return (
                <View>
                    <View style={[styles.rowBetween, {justifyContent: 'flex-start'}]}>
                        <View style={{backgroundColor: '#42BB55', width: 3, height: 16}}/>
                        <Text style={{fontSize: 15, color: '#666', marginLeft: 10}}>变更清单</Text>
                    </View>
                    {
                        list.map((item, i) => (
                            <View key={i}>
                                <View style={[styles.rowBetween, {backgroundColor: '#E8F6E8', height: 25}]}><Text
                                    style={{fontSize: 12, color: '#666'}}>{item.bgname}</Text>
                                </View>
                                <Divider style={{backgroundColor: '#ddd'}}/>
                                <View style={styles.rowBetween}>
                                    <Text style={{fontSize: 15, color: '#666'}}>变更数量（件）</Text>
                                    <Text style={{fontSize: 15, color: '#333'}}>{item.size}</Text>
                                </View>
                                <Divider style={{backgroundColor: '#ddd'}}/>
                                <View style={{padding: 10}}>
                                    <Text style={{fontSize: 15, color: '#666'}}>变更后库存</Text>
                                    <View style={{
                                        height: 53,
                                        width: 140,
                                        borderRadius: 2,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10
                                    }}>
                                        <Text style={{fontSize: 15, color: '#999'}}>{item.ck}</Text>
                                        <Text style={{fontSize: 15, color: '#999', marginTop: 5}}>{item.after}件</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            )
        } else {
            // 异仓变更
            return (
                <View>
                    <View style={[styles.rowBetween, {justifyContent: 'flex-start'}]}>
                        <View style={{backgroundColor: '#42BB55', width: 3, height: 16}}/>
                        <Text style={{fontSize: 15, color: '#666', marginLeft: 10}}>变更清单</Text>
                    </View>
                    {
                        list.map((item, i) => (
                            <View key={i}>
                                <View style={[styles.rowBetween, {backgroundColor: '#E8F6E8', height: 25}]}><Text
                                    style={{fontSize: 12, color: '#666'}}>{item.bgname}</Text>
                                </View>
                                <Divider style={{backgroundColor: '#ddd'}}/>
                                <View style={{padding: 10}}>
                                    <Text style={{fontSize: 15, color: '#666'}}>变更仓库</Text>
                                    <View style={styles.rowBetween}>
                                        <View style={{
                                            height: 32,
                                            width: 140,
                                            borderRadius: 2,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 10
                                        }}>
                                            <Text style={{fontSize: 15, color: '#999'}}>{item.from.ck}</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontSize: 15, color: '#999'}}>到</Text>
                                            <Icon
                                                name='long-arrow-right'
                                                type='font-awesome'
                                                color='#42BB55'
                                            />
                                        </View>
                                        <View style={{
                                            height: 32,
                                            width: 140,
                                            borderRadius: 2,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 10
                                        }}>
                                            <Text style={{fontSize: 15, color: '#999'}}>{item.to.ck}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider style={{backgroundColor: '#ddd'}}/>
                                <View style={{padding: 10}}>
                                    <Text style={{fontSize: 15, color: '#666'}}>变更后库存</Text>
                                    <View style={[styles.rowBetween, {marginTop: 10}]}>
                                        <View style={{
                                            height: 53,
                                            width: 140,
                                            borderRadius: 2,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{fontSize: 15, color: '#999'}}>{item.from.ck}</Text>
                                            <Text
                                                style={{fontSize: 15, color: '#999', marginTop: 5}}>{item.after}件</Text>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontSize: 15, color: '#999'}}>到</Text>
                                            <Icon
                                                name='long-arrow-right'
                                                type='font-awesome'
                                                color='#42BB55'
                                            />
                                        </View>
                                        <View style={{
                                            height: 53,
                                            width: 140,
                                            borderRadius: 2,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 10
                                        }}>
                                            <Text style={{fontSize: 15, color: '#999'}}>{item.to.ck}</Text>
                                            <Text
                                                style={{fontSize: 15, color: '#999', marginTop: 5}}>{item.after}件</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            )
        }
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

    _render() {
        const detail = this.props.auditDetail;
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.detail}>
                            <View style={styles.tag1}>
                                <View style={styles.tag1}>
                                    <View style={{justifyContent: 'space-around', alignItems: 'flex-start'}}>
                                        <Text style={[styles.text, {fontSize: 16}]}>变更单号: {detail.id}</Text>
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
                                <Text style={[styles.text, {color: '#666'}]}>变更类型</Text>
                                <Text style={styles.text}>{detail.type === '0' ? '同仓变更' : '异仓变更'}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={styles.rowBetween}>
                                <Text style={[styles.text, {color: '#666'}]}>审核人</Text>
                                <Text style={styles.text}>{detail.auditPerson}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#ddd'}}/>
                            <View style={{padding: 10}}>
                                <Text style={[styles.text, {color: '#666', marginBottom: 8}]}>变更原因</Text>
                                <Text style={styles.text}>{detail.reason}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            {this._renderContent(detail.type, detail.list)}
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
        auditDetail: state.Audit.getAuditCKBGDetail,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(AuditCKBGDetailScreen);


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
    },
});
