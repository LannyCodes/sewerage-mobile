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
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";
import {StatusHelper} from './utils';

class FaultDetailScreen extends WrapScreen {
    constructor(props) {
        super(props)
    }

    _header=()=>{
        return {
            title: "故障清单详情"
        }
    }

    _render() {
        const {faultDetail} = this.props.navigation.state.params || ''
        return (
            <ScrollView
                style={styles.scrollView}
                bounces={false}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerText}>{faultDetail.EQUIPMENT_NAME}</Text>
                            <TagLabel>处理中</TagLabel>
                        </View>
                        <Text style={styles.headerFootText}>
                            发起时间：
                            <Text>{faultDetail.CREATE_TIME}</Text>
                        </Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>上报人</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>{faultDetail.CREATE_USER}</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障来源</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>{StatusHelper.getBreakdownSource(faultDetail.BREAKDOWN_SOURCE)}</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障类型</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>{StatusHelper.getBreakdownType(faultDetail.TYPE)}</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.contentCell}>
                        <Text style={styles.cellText}>故障等级</Text>
                        <Text style={[styles.cellText,{color:'#333333'}]}>{StatusHelper.getRankPerform(faultDetail.RANK).text}</Text>
                    </View>
                    <View style={styles.divider}/>
                    <View>
                        <Text style={[styles.cellText,{marginTop:14,marginBottom:14}]}>故障描述</Text>
                        <Text style={[styles.cellText,{color:'#333333',marginBottom:14}]}>{faultDetail.BREAKDOWN_DESCRIBE || ''}</Text>
                    </View>
                    <View>
                        <Text style={[styles.cellText,{marginTop:14,marginBottom:14}]}>处理方式</Text>
                        <Text style={[styles.cellText,{color:'#333333',marginBottom:14}]}>{faultDetail.HANDLE_WAY || '无'}</Text>
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

