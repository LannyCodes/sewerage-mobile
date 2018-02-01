import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import { Status } from "../../../config/api/api.config";
import { ErrorPage, Loading, Dialog } from "../../components";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { renderCardStatus } from './auditComponents'
export default class AuditCKBGDetailComponent extends Component {

    _keyExtractor = (item, index) => index;

    _renderContent = (detail) => {
        // 1--同仓变更 2--异仓变更
        if (detail.WAY === 1) {
            // 同仓变更
            return (
                <View>
                    <View style={[styles.rowBetween, { justifyContent: 'flex-start' }]}>
                        <View style={{ backgroundColor: '#42BB55', width: 3, height: 16 }} />
                        <Text style={{ fontSize: 15, color: '#666', marginLeft: 10 }}>变更清单</Text>
                    </View>
                    {
                        detail.info.map((item, i) => (
                            <View key={'ccbg_item' + i}>
                                <View style={[styles.rowBetween, { backgroundColor: '#E8F6E8', height: 25 }]}><Text
                                    style={{ fontSize: 12, color: '#666' }}>{item.PRODUCT_ID_NAME}</Text>
                                </View>
                                <Divider style={{ backgroundColor: '#ddd' }} />
                                <View style={styles.rowBetween}>
                                    <Text style={{ fontSize: 15, color: '#666' }}>变更数量（件）</Text>
                                    <Text style={{ fontSize: 15, color: '#333' }}>{item.QUANTITY}</Text>
                                </View>
                                <View style={styles.rowBetween}>
                                    <Text style={{ fontSize: 15, color: '#666' }}>操作方式</Text>
                                    <Text style={{ fontSize: 15, color: '#333' }}>{item.OPERATION === '1' ? '增加' : '减少'}</Text>
                                </View>
                                <Divider style={{ backgroundColor: '#ddd' }} />
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#666' }}>变更后库存</Text>
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
                                        <Text style={{ fontSize: 15, color: '#999' }}>{item.TOTAL_QUANTITY - item.QUANTITY}</Text>
                                        <Text style={{ fontSize: 15, color: '#999', marginTop: 5 }}>{item.after}件</Text>
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
                    <View style={[styles.rowBetween, { justifyContent: 'flex-start' }]}>
                        <View style={{ backgroundColor: '#42BB55', width: 3, height: 16 }} />
                        <Text style={{ fontSize: 15, color: '#666', marginLeft: 10 }}>变更清单</Text>
                    </View>
                    {
                        detail.info.map((item, i) => (
                            <View key={i}>
                                <View style={[styles.rowBetween, { backgroundColor: '#E8F6E8', height: 25 }]}><Text
                                    style={{ fontSize: 12, color: '#666' }}>{item.PRODUCT_ID_NAME}</Text>
                                </View>
                                <Divider style={{ backgroundColor: '#ddd' }} />
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#666' }}>变更仓库</Text>
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
                                            <Text style={{ fontSize: 15, color: '#999' }}>{detail.WAREHOUSE_ID_BEFORE_NAME}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15, color: '#999' }}>到</Text>
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
                                            <Text style={{ fontSize: 15, color: '#999' }}>{detail.WAREHOUSE_ID_AFTER_NAME}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider style={{ backgroundColor: '#ddd' }} />
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#666' }}>变更后库存</Text>
                                    <View style={[styles.rowBetween, { marginTop: 10, marginBottom: 10 }]}>
                                        <View style={{
                                            height: 53,
                                            width: 140,
                                            borderRadius: 2,
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 15, color: '#999' }}>{detail.WAREHOUSE_ID_BEFORE_NAME}</Text>
                                            <Text
                                                style={{ fontSize: 15, color: '#999', marginTop: 5 }}>{item.QUANTITY}件</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15, color: '#999' }}>到</Text>
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
                                        }}>
                                            <Text style={{ fontSize: 15, color: '#999' }}>{detail.WAREHOUSE_ID_AFTER_NAME}</Text>
                                            <Text
                                                style={{ fontSize: 15, color: '#999', marginTop: 5 }}>{item.QUANTITY}件</Text>
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
            <TouchableOpacity style={styles.operateBox} onPress={() => {
                Dialog.showInput("审核备注", "请输入备注", (input) => {
                    console.log(input)
                });
            }}>
                <Text style={styles.text}>废弃</Text>
            </TouchableOpacity>
            <View style={{ height: 32, width: 0.5, backgroundColor: '#ccc' }} />
            <TouchableOpacity style={styles.operateBox} onPress={() => {
                Dialog.show("确定退出登录？", () => {
                    alert("确定")
                });
            }}>
                <Text style={styles.text}>驳回</Text>
            </TouchableOpacity>
            <View style={{ height: 32, width: 0.5, backgroundColor: '#ccc' }} />
            <TouchableOpacity style={styles.operateBox}>
                <Text style={styles.text}>通过</Text>
            </TouchableOpacity>
        </View>
    )

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
                                    <Text style={[styles.text, { fontSize: 16 }]}>变更单号: {detail.CODE}</Text>
                                </View>
                            </View>
                            {renderCardStatus(detail.STATUS)}
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>发起人</Text>
                            <Text style={styles.text}>{'发起人'}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>变更类型</Text>
                            <Text style={styles.text}>{detail.WAY === 1 ? '同仓变更' : '异仓变更'}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>审核人</Text>
                            <Text style={styles.text}>{detail.CHECK_USER_NAME}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={{ padding: 10 }}>
                            <Text style={[styles.text, { color: '#666', marginBottom: 8 }]}>变更原因</Text>
                            <Text style={styles.text}>{detail.REASON}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        {this._renderContent(detail)}
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
