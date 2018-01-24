/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { TagLabel } from '../../../components';
import { StatusHelper } from '../utils';
import _ from 'lodash'
import * as Utils from "../../../../core/utils";
import { WrapScreen } from "../../wrap";
import PropTypes from 'prop-types';

export class ListCell extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.item;
    }

    static propTypes = {
        clickFunc: PropTypes.func
    };

    _clickFunc = () => {
        if (typeof (this.props.clickFunc) === 'function') {
            this.props.clickFunc()
        }
    }

    render() {
        let { perform, text } = StatusHelper.getRankPerform(this.data.rank);
        return (
            <TouchableOpacity
                style={styles.cellContainer}
                activeOpacity={1}
                onPress={this._clickFunc}>
                <View style={styles.cellHeader}>
                    <Text style={styles.cellTitle}>{this.data.title}</Text>
                    <View style={styles.cellTagContainer}>
                        {
                            _.isUndefined(this.data.rank) ? <View /> : <TagLabel backgroundColor={perform.backgroundColor} fontColor={perform.color}>{text}</TagLabel>
                        }
                        <TagLabel containerStyle={{ marginLeft: 10 }}>处理中</TagLabel>
                    </View>
                </View>
                <View style={styles.cellContentContainer}>
                    <Text
                        style={styles.cellContent}
                        numberOfLines={1}>{this.data.content}</Text>
                </View>
                <View style={styles.cellFootContainer}>
                    <Text style={styles.footText}>上报人：{this.data.person}</Text>
                    <View>
                        {/* <Icon
                            name="ei-clock"
                            type="evilicon"
                            color="#999999"/> */}
                        <Text style={styles.footText}>{this.data.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = Utils.PLStyle({
    cellContainer: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        height: 100,
        backgroundColor: '#ffffff',
    },
    cellHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cellTitle: {
        fontSize: 16,
        color: '#333333',
    },
    cellTag: {
        height: 22,
        marginTop: 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "transparent",
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellTagContainer: {
        flexDirection: 'row',
    },
    cellTagText: {
        backgroundColor: 'transparent',
        fontSize: 12
    },
    cellContentContainer: {
        marginTop: 8,
    },
    cellContent: {
        fontSize: 14,
        color: '#666666'
    },
    cellFootContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    footText: {
        fontSize: 12,
        color: '#999999',
    }
})