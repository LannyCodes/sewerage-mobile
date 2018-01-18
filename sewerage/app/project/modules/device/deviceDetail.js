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
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";

class DeviceDetailScreen extends WrapScreen {
    constructor(props) {
        super(props)
        this.header = {
            title: "设备详情",
        }
    }

    componentDidMount(){
        this.store.dispatch(Actions.request(this,Urls.device.deviceDetail));
    }

    _render() {
        let deviceDetail = this.props.deviceDetail;
        return (
            <ScrollView
                style={styles.scrollView}
                bounces={false}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>{deviceDetail.name}</Text>
                            {/* <TagLabel>处理中</TagLabel> */}
                        </View>
                        <Text style={styles.headerFootText}>
                            所属厂站：
                            <Text>{deviceDetail.station}</Text>
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备编号</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.deviceCode}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备类型</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.deviceType}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备型号</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.deviceModel}</Text>
                    </View>                    
                </View>
                <View style={[styles.container,{marginTop:11}]}>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>供应商</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.supplier}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>设备性质</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.nature}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>生产厂家</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.factory}</Text>
                    </View>                    
                </View>
                <View style={[styles.container,{marginTop:11}]}>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>出厂日期</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.manufactureDate}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>报废日期</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.scrappedDate}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>所属运营商</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>{deviceDetail.operator}</Text>
                    </View>                    
                </View>
            </ScrollView >
        )
    }
}

function mapStateToProps(state){
    return {
        deviceDetail:state.device.getDeviceDetail,
    }
}

export default connect(mapStateToProps)(DeviceDetailScreen);

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