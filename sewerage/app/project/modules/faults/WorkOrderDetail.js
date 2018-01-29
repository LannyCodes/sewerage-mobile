/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Modal,
    FlatList,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native"
import { WrapScreen } from '../wrap';
import { Avatar } from 'react-native-elements';
import * as Utils from '../../../core/utils';
import { GridView, TagLabel, Loading } from '../../components';
import Urls from "../../../config/api/urls";
import { WOAudit, WOFaults, WOResult } from './components';
import { StatusHelper } from './utils';

const screenWidth = Dimensions.get('window').width;

class WorkOrderDetailScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.state = {
            showPreview: false,
            details: {},
        }
        this.item = this.props.navigation.state.params.item;
    };

    _header = () => {
        return {
            title: '故障工单详情'
        };
    }

    componentDidMount() {
        this._getDetail();
    }

    _getDetail = async () => {
        let params = {
            ID: this.props.navigation.state.params.item.ID
        }
        Loading.isLoading(true);
        try {
            let details = await Utils.get(this, Urls.faults.workOrderDetail, params)
            this.setState({
                details: details,
            })
            Loading.isLoading(false);
        } catch (err) {
            Loading.isLoading(false);
        }
    }

    _dealWorkOrder = () => {
        this.props.navigation.navigate('DealWorkOrder', { ID: this.item.ID });
    }

    _renderHeader = () => {
        let detail = this.state.details || '';
        let item = this.props.navigation.state.params.item;

        const { auditPerform, auditText } = StatusHelper.getAuditStatusPerform(item.STATUS);
        return (
            <View>
                <View style={styles.workOrderMessage}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>{item.BREAK_NUMBER}</Text>
                            <TagLabel backgroundColor={auditPerform.backgroundColor} fontColor={auditPerform.color}>{auditText}</TagLabel>
                        </View>
                        <Text style={styles.headerFootText}>
                            发起时间：
                                <Text>{item.CREATE_TIME}</Text>
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>发起人</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{detail.CREATE_USER_NAME}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>责任人</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{item.USER_NAME}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={[styles.cellText, { marginTop: 14, marginBottom: 14 }]}>工单描述</Text>
                        <Text style={[styles.cellText, { color: '#333333', marginBottom: 14 }]}>{item.DESCRIBE}</Text>
                    </View>
                </View>
                <View style={styles.listTag}>
                    <View style={{ backgroundColor: '#42BB55', height: 16, width: 3 }} />
                    <Text style={{ color: '#666666', fontSize: 15, marginLeft: 5 }}>故障清单</Text>
                </View>
            </View>
        )
    }

    //故障清单
    _renderListFoot = () => {
        const picWidth = (screenWidth - 10) / 4 - 10;
        return (
            <View style={styles.listFooter}>
                {this._renderResult()}
                <View style={styles.divider} />
                {
                    this._renderAuditRecord()
                }
            </View>
        )
    }

    _render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView style={styles.container} bounces={false}>
                    {this._renderHeader()}
                    <WOFaults data={this.state.details.BREAKDOWNS || []} />
                    <WOResult data={this.state.details.HANDLE_LOGS || []} />
                    <WOAudit data={this.state.details.CHECK_LOGS || []} />
                </ScrollView>
                {
                    this.state.details.STATUS === 1 ? <TouchableOpacity
                        style={styles.dealButton}
                        activeOpacity={1}
                        onPress={this._dealWorkOrder}>
                        <Text style={styles.buttonText}>处理</Text>
                    </TouchableOpacity> : <View />
                }
            </View>
        );
    };
};

export default WorkOrderDetailScreen;

const styles = Utils.PLStyle({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        // backgroundColor:'red',
    },
    workOrderMessage: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        marginBottom: 10,
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#ebebeb",
    },
    header: {
        // backgroundColor: '#ffffff',
        marginTop: 15,
    },

    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginBottom: 9,
    },
    headerText: {
        fontSize: 16,
        color: '#333333',
    },
    headerFootText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 19,
    },

    dealButton: {
        height: 43,
        marginTop: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#42bb55',
    },
    contentCell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        height: 44,
    },
    cellText: {
        fontSize: 15,
        color: '#666666',
    },
    listTag: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listFooter: {
        marginTop: 10,
        backgroundColor: '#ffffff',
    },
});