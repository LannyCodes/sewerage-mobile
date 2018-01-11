/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Dimensions,
} from "react-native"
import PropTypes from 'prop-types';
import * as Utils from '../../../core/utils';
import Echarts from '../../components/echarts';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class DataStatisticsView extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        dataType: PropTypes.string,
    };

    _echartOption = () => {

    }

    _renderHeaderView = () => {
        return (
            <View>
                {
                    
                }
            </View>
        )
    }

    render() {
        return (
            <ScrollView
                ref={(scrollView) => { this._scrollView = scrollView }}
                horizontal={true}
            >
                <View>

                </View>
                {/* <Echarts
                    option={this._echartOption()}
                /> */}
            </ScrollView>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,

    },

})