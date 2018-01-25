/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
} from "react-native"
import { WrapScreen } from '../wrap';
import * as Utils from '../../../core/utils';
import {MessageHelper} from './utils';

export default class MessageDetailScreen extends WrapScreen {
    constructor(props) {
        super(props)
    }

    _header = () => {
        return {
            title: '消息详情',
        }
    }

    _render() {
        // /-image:.*-/
        // /\/n/
        MessageHelper.messageContentAnalysis('阿斯顿发生的发斯蒂芬-image:http://www.baidu.com---asdasdfel');
        let test = '啊啊是发生的发生法撒旦法\n阿斯顿发斯蒂芬垃圾啊士大夫';
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 18, paddingBottom: 12 }}>
                        <Text style={styles.title}>固废处理事业部工作任务管理系统正式启用!</Text>
                        <Text style={styles.time}>2017-09-22 杨涛</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text>{test}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = Utils.PLStyle({
    scrollView:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    container: {
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#ffffff'
    },
    title: {
        color: '#42bb55',
        fontSize: 16,
        marginBottom: 11,
    },
    time: {
        color: '#999999',
        fontSize: 14,
    },
    divider: {
        height: 0.5,
        backgroundColor: '#E8E8E8',
        marginLeft: 2,
        marginRight: 2,
    }
})