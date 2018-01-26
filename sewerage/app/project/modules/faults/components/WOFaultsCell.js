/** 
 * Created by Infore.Wlun. 
 */

//工单详情故障清单列表

import React, { Component } from 'react'
import {
    View,
    FlatList,
    Dimensions,
    Text,
} from "react-native"
// import {WrapScreen} from '../../wrap'
import * as Utils from '../../../../core/utils'
import { GridView,TagLabel } from '../../../components';

const screenWidth = Dimensions.get('window').width;
export class WOFaultsCell extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <View style={{ backgroundColor: '#ffffff' }}>
                <View style={styles.listCellTag}>
                    <Text style={styles.listCellTagText}>清单一</Text>
                </View>
                <View style={{ paddingLeft: 10 }}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={{ fontSize: 15, color: '#666666' }}>渗滤液设备一号</Text>
                            <View style={styles.cellTagContainer}>
                                <TagLabel containerStyle={{ marginRight: 10 }}>II级</TagLabel>
                                <TagLabel>处理中</TagLabel>
                            </View>
                        </View>
                        <Text style={[styles.headerFootText, { color: '#333333', marginBottom: 11 }]}>一号一体机设备电机损坏，测试结果现实短路，水泵运转一号一体机设备电机损坏，测试结果现实短路，水泵运转空饷…</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障来源</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>杨涛</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障类型</Text>
                        <Text style={[styles.cellText, { color: '#333333' }]}>杨涛</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
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
})