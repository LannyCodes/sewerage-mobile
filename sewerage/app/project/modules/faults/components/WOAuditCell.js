/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
} from "react-native"
import * as Utils from '../../../../core/utils'

export class WOAuditCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let items = this.props.items;
        let index = this.props.index;
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
                    <Text style={[styles.arText, { fontSize: 14 }]}>审核驳回，没有处理好</Text>
                    <View style={styles.arFoot}>
                        <Text style={styles.arText}>审核人：</Text>
                        <Text style={styles.arText}>2017-03-29 15:32</Text>
                    </View>
                    {
                        index < items.length - 1 ? <View style={styles.divider} /> : <View />
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
    }
})