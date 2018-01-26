/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions
} from "react-native"
import { WrapScreen } from '../../wrap';
import * as Utils from '../../../../core/utils';
import { GridView } from '../../../components';

const screenWidth = Dimensions.get('window').width;
export class WOResultCell extends Component {
    constructor(props) {
        super(props)
    }

    

    render() {
        const picWidth = (screenWidth - 10) / 4 - 10;
        return (
            <View>
                <View style={styles.listTag}>
                    <View style={{ backgroundColor: '#42BB55', height: 16, width: 3 }} />
                    <Text style={{ color: '#666666', fontSize: 15, marginLeft: 5 }}>处理结果</Text>
                </View>
                <View >
                    <View style={{ paddingLeft: 10 }}>
                        <View style={styles.divider} />
                        <Text style={{ fontSize: 15, color: '#666666', marginTop: 14 }}>处理备注</Text>
                        <Text style={[styles.headerFootText, { color: '#333333', marginBottom: 11, marginTop: 14 }]}>湖南宁乡经济技术开发区污水处理厂采用较为先进的污水处理工艺五段式A/A/O-A/O+二沉池+微絮凝池+V型滤池+ClO2消毒， 其设计规模为5万立方米/日</Text>
                    </View>
                    <GridView
                        imgs={[{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }, { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }, { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }, { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" },]}
                        containerStyle={{ marginBottom: 20 }}
                        columns={4}
                        gridClick={this._imageClick} />
                </View>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    listTag: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listFooter: {
        marginTop: 10,
        backgroundColor: '#ffffff',
    },
    headerFootText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 19,
    },
})