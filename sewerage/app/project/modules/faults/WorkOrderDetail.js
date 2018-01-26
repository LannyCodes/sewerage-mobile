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
import { GridView, TagLabel, PicturesPreview } from '../../components';
import Urls from "../../../config/api/urls";
import { WOAuditCell, WOFaultsCell, WOResultCell } from './components';

const screenWidth = Dimensions.get('window').width;

class WorkOrderDetailScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.state = {
            showPreview: false,
            details: {},
        }
    };

    _header = () => {
        return {
            title: '故障工单详情'
        };
    }

    componentDidMount() {

    }

    getDetail = async () => {
        try {
            let details = await Utils.get(this, Urls.faults.workOrderDetail)
            this.setState({
                details: details,
            })
        } catch (err) {

        }
    }

    _keyExtractor = (item, index) => item.id;

    _dealWorkOrder = () => {
        this.props.navigation.navigate('DealWorkOrder');
    }

    _imageClick = () => {
        this._pp.showPreview()
    }

    _renderListHeader = () => {
        return (
            <View>
                <View style={styles.workOrderMessage}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>一号一体机设备</Text>
                            <TagLabel>处理中</TagLabel>
                        </View>
                        <Text style={styles.headerFootText}>
                            发起时间：
                                <Text>2017-06-30-12:00</Text>
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>发起人</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>杨涛</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>责任人</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>孙八一</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={[styles.cellText, { marginTop: 14, marginBottom: 14 }]}>工单描述</Text>
                        <Text style={[styles.cellText, { color: '#333333', marginBottom: 14 }]}>湖南宁乡经济技术开发区污水处理厂采用较为先进的污水处理工艺五段式A/A/O-A/O+二沉池+微絮凝池+V型滤池+ClO2消毒， 其设计规模为5万立方米/日</Text>
                    </View>
                </View>
                <View style={styles.listTag}>
                    <View style={{ backgroundColor: '#42BB55', height: 16, width: 3 }} />
                    <Text style={{ color: '#666666', fontSize: 15, marginLeft: 5 }}>故障清单</Text>
                </View>
            </View>
        )
    }

    //审核记录
    _renderAuditRecord = () => {
        return (
            <View>
                <View style={styles.listTag}>
                    <View style={{ backgroundColor: '#42BB55', height: 16, width: 3 }} />
                    <Text style={{ color: '#666666', fontSize: 15, marginLeft: 5 }}>审核记录</Text>
                </View>
                <View style={styles.divider} />
                <View>
                    {
                        ['a', 'b', 'c', 'd'].map((item, index, items) => {
                            // return this._renderAuditRecordCell(item, index, items)
                            return <WOAuditCell item={item} index={index} items={items}/>
                        })
                    }
                </View>
            </View>
        )
    }

    _renderResult=()=>{
        return <WOResultCell/>
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
            <View style={styles.container}>
                <FlatList
                    bounces={false}
                    data={[{ id: '1' }]}
                    keyExtractor={this._keyExtractor}
                    renderItem={()=><WOFaultsCell/>}
                    ListHeaderComponent={this._renderListHeader}
                    ListFooterComponent={this._renderListFoot}
                />
                <TouchableOpacity
                    style={styles.dealButton}
                    activeOpacity={1}
                    onPress={this._dealWorkOrder}>
                    <Text style={styles.buttonText}>处理</Text>
                </TouchableOpacity>
                <PicturesPreview
                    ref={pp => this._pp = pp}
                    images={images} />
            </View>
        );
    };
};

const images = [{ url: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }, { url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }, { url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }, { url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }]

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
    cellTagContainer: {
        flexDirection: 'row',
    },
    listTag: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listCellTag: {
        height: 25,
        backgroundColor: 'rgba(66,187,85,0.2)',
        paddingLeft: 10,
        justifyContent: 'center',
    },
    listCellTagText: {
        fontSize: 12,
        color: '#666666'
    },
    listFooter: {
        marginTop: 10,
        backgroundColor: '#ffffff',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    grid: {
        // backgroundColor:'red',
        marginRight: 10,
        marginBottom: 10
    },
    //审核记录
    arContainer: {
        flexDirection: "row"
    },
    arLeft: {
        alignItems: 'center',
        width: 40,
    },
    arLeftLine: {
        backgroundColor: '#d8d8d8',
        width: 1,
        flex: 1,
    },
    arDot: {
        width: 9,
        height: 9,
        borderWidth: 1,
        borderColor: "#d8d8d8",
        borderRadius: 25,
        backgroundColor: '#d8d8d8',
    },
    arMsg: {
        flex: 1,
        paddingTop: 20,
        // paddingBottom:12,
        paddingRight: 10,
    },
    arText: {
        color: '#999999',
        fontSize: 12,
    },
    arFoot: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'space-between'
    }
});