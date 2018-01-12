/** 
 * Created by Infore.Wlun. 
 */

//故障清单详情

import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
} from "react-native"
import { WrapScreen } from '../wrap'
import * as Utils from '../../../core/utils'
import { Divider } from 'react-native-elements'
import {TagLabel} from '../../components'

class FaultDetailScreen extends WrapScreen {
    constructor(props) {
        super(props)
        this.header = {
            title: "故障清单详情"
        }
    }

    _render() {
        return (
            <ScrollView
                style={styles.scrollView}
                bounces={false}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>一号一体机设备</Text>
                            <TagLabel>处理中</TagLabel>
                        </View>
                        <Text style={styles.headerFootText}>
                            发起时间：
                            <Text>2017-06-30-12：00</Text>
                        </Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>上报人</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>杨涛</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障来源</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>维保</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障类型</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>机械故障</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障等级</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>一级</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View>
                        <Text style={[styles.cellText,{marginTop:14,marginBottom:14}]}>故障描述</Text>
                        <Text style={[styles.cellText,{color:'#333333',marginBottom:14}]}>湖南宁乡经济技术开发区污水处理厂采用较为先进的污水处理工艺五段式A/A/O-A/O+二沉池+微絮凝池+V型滤池+ClO2消毒， 其设计规模为5万立方米/日</Text>
                    </View>
                    <View>
                        <Text style={[styles.cellText,{marginTop:14,marginBottom:14}]}>处理方式</Text>
                        <Text style={[styles.cellText,{color:'#333333',marginBottom:14}]}>湖南宁乡经济技术开发区污水处理厂采用较为先进的污水处理工艺五段式A/A/O-A/O+二沉池+微絮凝池+V型滤池+ClO2消毒， 其设计规模为5万立方米/日</Text>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

export default FaultDetailScreen

const styles = Utils.PLStyle({
    scrollView: {
        flex: 1
    },
    divider: {
        width:"100%",
        height:0.5,
        backgroundColor:"#ebebeb",
    },
    container: {
        paddingLeft: 10,
        backgroundColor: '#ffffff',
    },
    header: {
        // backgroundColor: '#ffffff',
        marginTop:15,
        
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginBottom:9,
    },
    headerText: {
        fontSize:16,
        color:'#333333',
    },
    headerFootText: {
        fontSize:14,
        color:'#666666',
        marginBottom:19,
    },
    contentCell: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:10,
        height:44,
    },
    cellText: {
        fontSize:15,
        color:'#666666',
    },

})

