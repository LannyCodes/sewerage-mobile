/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
} from "react-native"
import { WrapScreen } from '../wrap';
import * as Utils from '../../../core/utils';

class DeviceDetailScreen extends WrapScreen {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    _header = () => {
        return {
            title: "设备详情",
        }
    }

    _getEquipmentType=(typeCode)=>{
        let type = '';
        switch(typeCode){
            case 1:
                type='普通设备';
                break;
            case 2:
                type="一体机";
                break;
            case 3:
                type="渗滤液设备";
                break;
            case 4:
                type="视屏监控设备";
                break;
            default:
                break;
        }
        return type;
    }

    _render() {
        let {deviceDetail} = this.props.navigation.state.params || '';
        return (
            <ScrollView
                style={styles.scrollView}
                bounces={false}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>{deviceDetail.NAME}</Text>
                            {/* <TagLabel>处理中</TagLabel> */}
                        </View>
                        <Text style={styles.headerFootText}>
                            所属厂站：
                            <Text>{deviceDetail.STATION_NAME}</Text>
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备编号</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.CODE}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备类型</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{this._getEquipmentType(deviceDetail.TYPE)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备型号</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.MODEL_NUMBER}</Text>
                    </View>
                </View>
                <View style={[styles.container, { marginTop: 11 }]}>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>供应商</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.SUPPLIER}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备性质</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.EQUIPMENT_NATURE}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>生产厂家</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.MANUFACTOR}</Text>
                    </View>
                </View>
                <View style={[styles.container, { marginTop: 11 }]}>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>出厂日期</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.FACTORY_DATE}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>报废日期</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.SCRAP_DATE}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>所属运营商</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.COMPANY_NAME}</Text>
                    </View>
                </View>
            </ScrollView >
        )
    }
}


export default DeviceDetailScreen;

const styles = Utils.PLStyle({
    scrollView: {
        flex: 1
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#ebebeb",
    },
    container: {
        paddingLeft: 10,
        backgroundColor: '#ffffff',
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
})