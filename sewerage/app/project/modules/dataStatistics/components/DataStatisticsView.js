/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
} from "react-native"
import PropTypes from 'prop-types';
import * as Utils from '../../../../core/utils';
import Echarts from '../../../components/echarts';
import { Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation';
import ChartView from './ChartView';
import { PageControl } from '../../../components';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const pixel = PixelRatio.get();

export default class DataStatisticsView extends Component {
    constructor(props) {
        super(props)
        this.headerCellWidth = (screenWidth - 40) / 3;
        this.state = {
            cellIndex: 0,
        }
    }

    componentDidMount() {

    }

    static propTypes = {
        dataType: PropTypes.string,
    };

    _echartOption = (grid) => {
        let axisColor = '#E9E9E9'
        return {
            tooltip: {
                //设置悬浮框
                triggerOn: 'none',
                position: function (pt) {
                    return [pt[0], 65];
                },
                alwaysShowContent: true,
                textStyle: {
                    color: '#999999',
                    fontSize: 15,
                },
                confine: true,
                backgroundColor: '#ffffff',
                padding: 10,
                formatter: '时间:2017年10月<br/>故障:{c0}',//TODO:需要做设置
                extraCssText: 'box-shadow: 0 4px 8px 0px #CBE0CE;'
            },
            grid: grid,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {//X轴刻度设置
                        alignWithLabel: true,
                        length: 10,
                        lineStyle: {
                            color: axisColor,
                            width: 1,
                        }
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: axisColor,
                            width: 1,
                        }
                    },
                    axisLabel: {
                        margin: 16 * pixel,
                        textStyle: {
                            fontSize: 10,
                            color: '#6a6a6a'
                        }
                    },
                    axisPointer: {
                        value: '3',
                        label: {
                            show: false,
                        },
                        snap: true,
                        lineStyle: {
                            color: '#004e52',
                            opacity: 0.5,
                            widht: 2,
                        },
                        handle: {
                            show: true,
                            color: '#004E52'
                        },
                        lineStyle: {
                            color: '#979797',
                            width: 2,
                        }
                    },
                    data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        margin: 12,
                        textStyle: {
                            fontSize: 10,
                            color: '#6a6a6a'
                        }
                    },
                    splitLine: {//分割线
                        lineStyle: {
                            color: axisColor,
                            width: 1
                        }
                    }
                }
            ],
            series: [
                {
                    name: '2016 降水量',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: '#1AAD19',
                        width: 2,
                    },
                    data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                }
            ]
        };

    }

    //func

    _yearChange = (type) => {

    }

    _turnOrientation = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                Orientation.lockToLandscapeRight();
            } else {
                Orientation.lockToPortrait();
            }
        })
    }
    
    _onAnimationEnd = (e) => {
        var offSetX = e.nativeEvent.contentOffset.x;
        var currentPage = offSetX / screenWidth;
        if(this.props.data.length>6){
            this._pageControl.setIndex(currentPage);
        }

    }

    // actions
    _cellClicked = (item, index, pageIndex) => {
        this.setState({
            cellIndex: (pageIndex * 6 + index),
        })
    }

    _onLeftYearPress = () => {
        this._yearChange('left');
    }

    _onRightYearPress = () => {
        this._yearChange('right');
    }

    //render方法

    _renderHeaderCell = (item, index, pageIndex, pageCount) => {
        let totalIndex = pageIndex * 6 + index;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this._cellClicked.bind(this, item, index, pageIndex)}
                style={[styles.headerCell, { height: 83, width: this.headerCellWidth, flexDirection: 'row' }]}>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.headerNumber, { color: this.state.cellIndex === totalIndex ? '#42BB55' : '#333333' }]}>{item.number}</Text>
                        <View></View>
                    </View>
                    <Text style={[styles.headerName, { color: this.state.cellIndex === totalIndex ? '#42BB55' : '#b9b9b9' }]}>{item.name}</Text>
                </View>
                {
                    ((index + 1) % 3 === 0 || index + 1 === pageCount) ? <View /> : <View style={styles.headerSeperator} />
                }
            </TouchableOpacity>
        )
    }

    /**
     * @param index  这里的索引是分页索引
     */
    _renderHeaderPage = (items, pageIndex) => {
        return (
            <View style={[styles.headerPage, { width: screenWidth }]}>
                {
                    items.map((item, index) => {
                        return this._renderHeaderCell(item, index, pageIndex, items.length);
                    })
                }
            </View>
        )
    }

    _renderHeaderView = () => {
        let pageArray = []
        let index = 0;
        while (index < this.props.data.length) {
            let pageData = this.props.data.slice(index, index + 6);
            pageArray.push(pageData);
            index += 6;
        }
        return (
            <View>
                <ScrollView
                    ref={scrollView => this._headerScrollView = scrollView}
                    bounces={false}
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.headerScrollView}
                    onMomentumScrollEnd={(e)=>{
                        this._onAnimationEnd(e)
                    }}>
                    {
                        pageArray.map((item, index) => {
                            return this._renderHeaderPage(item, index)
                        })
                    }
                </ScrollView>
                {
                    this.props.data.length > 6 ? <PageControl
                    style={{
                        bottom: 8,
                        position: 'absolute',
                    }}
                    color='#e7e7e7'
                    selectedColor='#42bb55'
                    ref={(pageControl) => { this._pageControl = pageControl }} /> : <View/>
                }
            </View>
        )
    }

    _renderChartView() {
        return (
            <View style={{ marginTop: 9, paddingTop: 20, backgroundColor: '#ffffff' }}>
                <ChartView
                    height={screenHeight - 332}
                    width={screenWidth}
                    expand={this.props.expandFunc.bind(this, this._echartOption({ top: 20, right: 25, bottom: 75 }))}
                    echartOption={this._echartOption({ top: 20, right: 20, bottom: 75 })} />
            </View>
        )
    }

    render() {
        return (
            // <ScrollView
            //     ref={(scrollView) => { this._scrollView = scrollView }}
            //     bounces={false}
            // >

            //     {/* <Echarts
            //         option={this._echartOption()}
            //     /> */}
            // </ScrollView>
            <View>
                {
                    this._renderHeaderView()
                }
                {
                    this._renderChartView()
                }
            </View>

        )
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,

    },
    headerScrollView: {
        height: 165,
        backgroundColor: '#ffffff',
    },
    headerPage: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    headerCell: {
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerName: {
        fontSize: 12,
        color: '#b9b9b9',
        marginTop: 2,
    },
    headerNumber: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#333333",
        fontStyle: 'italic'
    },
    headerSeperator: {
        width: 1,
        height: 48,
        position: 'absolute',
        right: 0,
        backgroundColor: '#e5e5e5',
        // alignSelf: 'flex-end',
    },
    chartView: {
        marginTop: 9,
        paddingTop: 20,
        backgroundColor: '#ffffff',
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