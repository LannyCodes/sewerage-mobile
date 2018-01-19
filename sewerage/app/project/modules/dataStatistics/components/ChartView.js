/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from "react-native"
import * as Utils from '../../../../core/utils';
import Echarts from '../../../components/echarts';
import { Icon } from 'react-native-elements';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class ChartView extends Component {
    constructor(props) {
        super(props)
    }

    reload=()=>{
        this._echarts.reload();
    }

    render() {
        return (
            <View style={[styles.chartView]}>
                <View style={styles.chartHeader}>
                    <Text style={styles.chartHeaderTitle}>故障数量</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            size={18}
                            name={'chevron-left'}
                            type='feather'
                            color={'#979797'}
                            onPress={this.props._onLeftYearPress}
                        />
                        <Text style={styles.chartHeaderYear}>2017年</Text>
                        <Icon
                            size={18}
                            name={'chevron-right'}
                            type='feather'
                            color={'#979797'}
                            onPress={this.props._onRightYearPress}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 15 }}
                        activeOpacity={1}
                        onPress={this.props.expand}>
                        <Text>扩大</Text>
                    </TouchableOpacity>
                </View>
                <Echarts
                    ref={echarts => this._echarts = echarts}
                    height={this.props.height}
                    width={this.props.width}
                    option={this.props.echartOption} />
            </View>
        )
    }
}

export default ChartView

const styles = Utils.PLStyle({
    chartView: {
        backgroundColor: '#ffffff',
        // flex:1,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartHeaderYear: {
        marginLeft: 12,
        marginRight: 12,
        color: '#42bb55',
        fontSize: 14,
    },
    chartHeaderTitle: {
        color: '#797979',
        fontSize: 14,
        position: 'absolute',
        left: 15
    }
})