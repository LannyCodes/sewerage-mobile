/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
} from "react-native"
import * as Utils from '../../core/utils'

export class AuditProcessList extends Component {
    constructor(props) {
        super(props)
        this.approveColor = '#4ECC80';
        this.checkColor = '#999999';
    }

    _dotStyle=(status)=>{
        let style = {}
        if(status===3){
            style = {
                backgroundColor:this.approveColor,
                borderWidth:5,
                width:20,
                height:20,
                borderRadius:25,
                borderColor:'#C6EFD6',
            }
        }
        return style
    }

    _renderItem = (item, index, items) => {
        // let items = this.props.data
        return (
            <View style={styles.arContainer}>
                <View style={styles.arLeft}>
                    <View style={[styles.arLeftLine, { backgroundColor: index === 0 ? 'transparent' : '#d8d8d8' }]} />
                    {
                        index === 0 || index === items.length - 1 ? <View style={[styles.arDot,{...this._dotStyle(item.STATUS)}]} /> : <View />
                    }
                    <View style={[styles.arLeftLine, { backgroundColor: index === items.length - 1 ? 'transparent' : '#d8d8d8' }]} />
                </View>
                <View style={styles.arMsg}>
                    <Text style={[styles.arText, { fontSize: 14, color: item.STATUS === 3 ? this.approveColor : this.checkColor }]}>{item.CONTENT}</Text>
                    <View style={styles.arFoot}>
                        <Text style={[styles.arText, { color: item.STATUS === 3 ? this.approveColor : this.checkColor }]}>审核人：{item.USER_NAME}</Text>
                        <Text style={[styles.arText, { color: item.STATUS === 3 ? this.approveColor : this.checkColor }]}>{item.CREAT_TIME}</Text>
                    </View>
                    {
                        index < items.length - 1 ? <View style={styles.divider} /> : <View />
                    }
                </View>
            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View>
                {
                    this.props.data.map((item, index, items) => {
                        return this._renderItem(item, index, items)
                    })
                }
            </View>
        )
    }
}

const styles = Utils.PLStyle({
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
    },
    listTag: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ebebeb',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#ebebeb",
    },
})

