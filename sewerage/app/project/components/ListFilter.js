/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native"
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as Util from '../../core/utils';
import * as Assets from '../assets';
import _ from 'lodash';
const screenWidth = Dimensions.get('window').width;

const filterArray = [
    {
        title: '类型',
        keyName: 'ssb',
        multipleChoice:false,
        data: [{
            name: '类型一',
            value: '11',
        }, {
            name: '类型二',
            value: '22',
        }, {
            name: '类型三',
            value: '33',
        }]
    },
    {
        title: '规格',
        keyName: 'aab',
        multipleChoice:true,
        data: [{
            name: '规格一',
            value: '11',
        }, {
            name: '规格二',
            value: '22',
        }, {
            name: '规格三',
            value: '33',
        }, {
            name: '规格四',
            value: '44',
        }]
    },
    {
        title: '规格',
        keyName: 'ccs',
        multipleChoice:false,
        data: [{
            name: '规格一',
            value: '11',
        }, {
            name: '规格二',
            value: '22',
        }, {
            name: '规格三',
            value: '33',
        }]
    }
];

//示例key:value
const initail = {'ssb':'1'}

export class ListFilter extends React.PureComponent {

    constructor(props) {
        super(props);
        let initailState = {}
        if(this.props.initails != undefined && typeof(this.props.initails) === 'object'){
            _.mapKeys(this.props.initails,(value,key)=>{
                initailState[key] = value;
            })
        }
        this.state = {
            ...initailState,
        }
    }

    static propTypes = {
        filterArray: PropTypes.array,
        headerType: PropTypes.object,
        containerStyles: PropTypes.object,
        columnNumber: PropTypes.number,//一行多少个，默认3个
        confirm: PropTypes.func,
        reset: PropTypes.func,
        maskerClick: PropTypes.func,
        width: PropTypes.number,//宽度，默认屏幕宽度
        selectedColor: PropTypes.string,
        unselectedColor: PropTypes.string,
        selectedTextColor: PropTypes.string,
        unselectedTextColor: PropTypes.string,
        initails: PropTypes.object,//初始化选中，规格看示例
    };

    static defaultProps = {
        filterArray: filterArray,
        headerType: {},
        containerStyles: {},
        columnNumber: 3,
        selectedColor: '#ffffff',
        unselectedColor: '#ffffff',
        selectedTextColor: '#42BB55',
        unselectedTextColor: '#404040',
    };

    _itemClick = (value, keyName, keyIndex) => {
        if (this.props.filterArray[keyIndex].multipleChoice) {
            //允许多选
            let arrayStr = this.state[keyName];
            let array = arrayStr === undefined ? [] : JSON.parse(arrayStr);
            let index = array.indexOf(value)
            index > -1 ? array.splice(index, 1) : array.push(value)
            arrayStr = JSON.stringify(array)
            this.setState({
                [keyName]: arrayStr,
            })
        } else {
            //单选
            value = this.state[keyName] === value ? '' : value;
            this.setState({
                [keyName]: value,
            })
        }
    }

    _reset = () => {
        // this.setState({})
        this.props.filterArray.map((item,index)=>{
            let test = this.state;
            this.setState({
                [item.keyName]:'[]'
            })
        })
        if (typeof (this.props.reset) === 'function') {
            this.props.reset(this.state);
        }
    }

    _confirm = () => {
        if (typeof (this.props.confirm) === 'function') {
            this.props.confirm(this.state)
        }
    }

    _maskerClick = () => {
        if (typeof (this.props.maskerClick) === 'function') {
            this.props.maskerClick();
        }
    }

    /**
     * @param index 大类的索引
     * @param itemIndex 选项索引
     * @param keyName 大类的key
     * @param value 选项的值
     */
    _isItemSelected = (index, itemIndex, keyName, value) => {
        let multipleChoice = this.props.filterArray[index].multipleChoice
        let toSelect = false
        if (multipleChoice) {
            let arrayStr = this.state[keyName];
            let array = arrayStr === undefined ? [] : JSON.parse(arrayStr);
            let arrayIndex = array.indexOf(value);
            toSelect = arrayIndex > -1;
        } else {
            toSelect = this.state[keyName] === value
        }
        return toSelect;
    }

    /**
     * @param item 每一类的内容
     * @param index 每一类的索引
     */
    _renderContent = (item, index) => {

        return (
            <View key={index}>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>{item.title}</Text>
                </View>
                <View style={styles.itemContainer}>
                    {
                        item.data.map((item1, index1) => {
                            let isSelected = this._isItemSelected(index, index1, item.keyName, item1.value);
                            return (
                                <TouchableOpacity
                                    key={index1}
                                    style={[styles.item, { width: this._containerWidth / 3, backgroundColor: isSelected ? this.props.selectedColor : this.props.unselectedColor }]}
                                    onPress={this._itemClick.bind(this, item1.value, item.keyName, index)}
                                    activeOpacity={1}>
                                    {
                                        isSelected ? <Image source={Assets.Components.checked} resizeMethod="cover"/> : <View/>
                                    }
                                    <Text style={[styles.itemText, { color: isSelected ? this.props.selectedTextColor : this.props.unselectedTextColor }]}
                                        activeOpacity={1}>{item1.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    render() {
        this._containerWidth = this.props.width ? this.props.width : screenWidth;
        return (
            <View
                style={[styles.container, this.props.containerStyles, { width: this._containerWidth }]}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.masker}
                    onPress={this._maskerClick} />
                {
                    this.props.filterArray.map((item, index) => {
                        return (
                            this._renderContent(item, index)
                        )
                    })
                }
                <View style={{ height: 48, backgroundColor: 'red', flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.buttonStyle, { borderWidth: 1, borderColor: '#e8e8e8' }]}
                        onPress={this._reset}>
                        <Text style={styles.buttonTitle}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this._confirm}
                        style={[styles.buttonStyle, { backgroundColor: '#42bb55' }]}>
                        <Text style={[styles.buttonTitle, { color: '#ffffff' }]}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = Util.PLStyle({
    container: {
        top: 50,
        flex: 1,
        height: '100%',
        position: 'absolute',
    },
    section: {
        backgroundColor: '#fafafa',
        height: 39,
        justifyContent: 'center',
        // borderColor: '#ededed',
        // borderWidth: 0.5,
    },
    sectionText: {
        marginLeft: 20,
        color: '#666666',
        fontSize: 12,
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fafafa',
    },
    item: {
        flexDirection:'row',
        backgroundColor: '#ffffff',
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ededed',
        borderWidth: 0.5,
    },
    itemText: {
        color: '#404040',
        fontSize: 14,
        flexDirection: 'row',
        marginLeft:6
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 16,
        color: '#666666',
    },
    masker: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.48)',
    }
})