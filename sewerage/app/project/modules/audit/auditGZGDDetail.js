import React, { Component } from 'react';

import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import { Status } from "../../../config/api/api.config";
import { ErrorPage, Loading } from "../../components";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-elements";
import { renderCardStatus, renderCheckLogs, renderOperate } from './auditComponents'
export default class AuditGZGDDetailComponent extends Component {

    _renderContent = (list) => {
        return (
            <View>
                <View style={[styles.rowBetween, { justifyContent: 'flex-start' }]}>
                    <View style={{ backgroundColor: '#42BB55', width: 3, height: 16 }} />
                    <Text style={{ fontSize: 15, color: '#666', marginLeft: 10 }}>故障清单</Text>
                </View>
                {
                    list.map((item, i) => (
                        <View key={i}>
                            <View style={[styles.rowBetween, { backgroundColor: '#E8F6E8', height: 25 }]}><Text
                                style={{ fontSize: 12, color: '#666' }}>清单{i + 1}</Text></View>
                            <View style={{ padding: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, color: '#666' }}>{item.EQUIPMENT_NAME}</Text>
                                    <View style={styles.rankContent}>
                                        <Text style={styles.rankStyle}>{['I级', 'II级', 'III级'][item.RANK]}</Text>
                                    </View>
                                </View>
                                <Text style={{
                                    fontSize: 13,
                                    color: '#333',
                                    marginTop: 11,
                                    lineHeight: 20
                                }}>{item.BREAKDOWN_DESCRIBE}</Text>
                            </View>
                            <Divider style={{ backgroundColor: '#ddd' }} />
                            <View style={styles.rowBetween}>
                                <Text style={{ fontSize: 15, color: '#666' }}>故障来源</Text>
                                <Text style={{ fontSize: 15, color: '#333' }}>{['巡检', '维保', '其他'][item.BREAKDOWN_SOURCE]}</Text>
                            </View>
                            <Divider style={{ backgroundColor: '#ddd' }} />
                            <View style={styles.rowBetween}>
                                <Text style={{ fontSize: 15, color: '#666' }}>故障类型</Text>
                                <Text style={{ fontSize: 15, color: '#333' }}>{['机械故障', '控制故障', '电气故障'][item.TYPE]}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }
    _keyExtractor = (item, index) => index;

    render() {
        const detail = this.props.auditDetail;
        console.log(detail)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.detail}>
                        <View style={styles.tag1}>
                            <View style={styles.tag1}>
                                <View style={{ justifyContent: 'space-around', alignItems: 'flex-start' }}>
                                    <Text style={[styles.text, { fontSize: 16 }]}>工单编号: {detail.BREAK_NUMBER}</Text>
                                </View>
                            </View>
                            {renderCardStatus(detail.STATUS)}
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>发起人</Text>
                            <Text style={styles.text}>{detail.CHECK_USER_NAME}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>责任人</Text>
                            <Text style={styles.text}>{detail.USER_NAME}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={{ padding: 10 }}>
                            <Text style={[styles.text, { color: '#666', marginBottom: 8 }]}>工单描述</Text>
                            <Text style={styles.text}>{detail.DESCRIBE}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        {this._renderContent(detail.BREAKDOWNS)}
                    </View>
                    {detail.STATUS !== 0 && renderCheckLogs(detail.CHECK_LOGS)}
                </ScrollView>
                {detail.STATUS === 0 && renderOperate(this)}
            </View>
        )
    }
}

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
    rankStyle: {
        fontSize: 12,
        color: '#47A9EB',
    },
    rankContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECF6FD',
        width: 30,
        height: 16,
        borderRadius: 15
    }
});
