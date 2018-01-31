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
        let item = this.props.navigation.state.params.item;
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 18, paddingBottom: 12 }}>
                        <Text style={styles.title}>{item.TITLE}</Text>
                        <Text style={styles.time}>{item.SEND_DATE} {item.SEND_NICKNAME}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text>{item.CONTENT}</Text>
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