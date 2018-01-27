/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
} from "react-native"
import * as Utils from '../../../../core/utils'

export class WOAudit extends Component {
    constructor(props) {
        super(props)
    }

    _renderItem=(item,index,items)=> {
        return (
            <View style={styles.arContainer}>
                <View style={styles.arLeft}>
                    <View style={[styles.arLeftLine, { backgroundColor: index === 0 ? 'transparent' : '#d8d8d8' }]} />
                    {
                        index === 0 || index === items.length - 1 ? <View style={styles.arDot} /> : <View />
                    }
                    <View style={[styles.arLeftLine, { backgroundColor: index === items.length - 1 ? 'transparent' : '#d8d8d8' }]} />
                </View>
                <View style={styles.arMsg}>
                    <Text style={[styles.arText, { fontSize: 14 }]}>{item.CONTENT}</Text>
                    <View style={styles.arFoot}>
                        <Text style={styles.arText}>审核人：{item.USER_NAME}</Text>
                        <Text style={styles.arText}>{item.CREAT_TIME}</Text>
                    </View>
                    {
                        index < items.length - 1 ? <View style={styles.divider} /> : <View />
                    }
                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={{backgroundColor:'#ffffff'}}>
                <View style={styles.listTag}>
                    <View style={{ backgroundColor: '#42BB55', height: 16, width: 3 }} />
                    <Text style={{ color: '#666666', fontSize: 15, marginLeft: 5 }}>审核记录</Text>
                </View>
                <View>
                    {
                        this.props.data.map((item, index, items) => {
                            // return this._renderAuditRecordCell(item, index, items)
                            // return <WOAuditCell item={item} index={index} items={items}/>
                            return this._renderItem(item,index,items)
                        })
                    }
                </View>
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
        borderColor:'#ebebeb',
        borderBottomWidth:0.5,
        borderTopWidth:0.5
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#ebebeb",
    },
})