import React from 'react';

import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils";
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar, Divider, Icon} from "react-native-elements";

export default class TaskDealDetailScreen extends WrapScreen {

    _header = () => {
        return {
            title: '故障处理详情',
        }
    };

    _render() {
        let {CONTENT, STATUS, BREAKDOWN} = this.props.navigation.state.params.data;
        let status = ['未巡检', '异常', '正常', '未确定'];
        let rank = ['I级', 'II级', 'III级'];
        let type = ['机械故障', '控制故障', '电气故障'];
        let handleStatus = ['待处理', '工单正在处理', '现场解决', '工单处理完成'];
        let breakDownSource = ['巡检', '维保', '其他'];
        return (
            <ScrollView style={styles.container}>
                <View style={{backgroundColor: 'white'}}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.text}>{CONTENT}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text
                            style={[styles.text, {color: '#666'}]}>{breakDownSource[BREAKDOWN.BREAKDOWN_SOURCE]}内容状态</Text>
                        <Text style={styles.text}>{status[STATUS]}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, {color: '#666'}]}>故障描述</Text>
                        <Text style={styles.text}>{BREAKDOWN.BREAKDOWN_DESCRIBE}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, {color: '#666'}]}>故障来源</Text>
                        <Text style={styles.text}>{breakDownSource[BREAKDOWN.BREAKDOWN_SOURCE]}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, {color: '#666'}]}>故障类型</Text>
                        <Text style={styles.text}>{type[BREAKDOWN.TYPE]}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, {color: '#666'}]}>故障等级</Text>
                        <Text style={styles.text}>{rank[BREAKDOWN.RANK]}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, {color: '#666'}]}>处理状态</Text>
                        <Text style={styles.text}>{handleStatus[BREAKDOWN.STATUS]}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#ddd'}}/>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, {color: '#666'}]}>处理方式</Text>
                        <Text style={styles.text}>{BREAKDOWN.HANDLE_WAY}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    text: {
        color: '#333333',
        fontSize: 15
    },
    rowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 44,
        paddingLeft: 10,
        paddingRight: 10
    },
});
