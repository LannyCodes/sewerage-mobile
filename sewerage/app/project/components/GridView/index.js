/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    ViewPropTypes,
    TouchableOpacity,
} from "react-native"
import * as Utils from '../../../core/utils'
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width

export class GridView extends Component {
    constructor(props) {
        super(props)
        this._gridWidth = Math.floor((this.props.width + this.props.gridMargin - this.props.marginLeft - this.props.marginRight) / this.props.columns * 10) / 10 - this.props.gridMargin;
        this.columns = this.props.columns;
        this.totalCount = this.props.imgs.length;
        if (this.props.isShowAdd) {
            this.totalCount++;
        }
    }

    static propTypes = {
        imgs: PropTypes.array,//图片source
        width: PropTypes.number,//定义外围宽度，默认为屏幕宽度
        columns: PropTypes.number,//列数
        containerStyle: ViewPropTypes.style,
        gridClick: PropTypes.func,//每一个grid点击事件
        addGrid: PropTypes.func, //增加按钮点击事件
        resizeMode: PropTypes.string,
        gridMargin: PropTypes.number,
        marginLeft: PropTypes.number,//定义外围左右的margin
        marginRight: PropTypes.number,
        isShowAdd: PropTypes.bool,//是否展示增加的按钮
        showDelete: PropTypes.any,//展示删除按钮
        deleteClick: PropTypes.func,
    };

    static defaultProps = {
        width: screenWidth,
        columns: 3,
        resizeMode: 'contain',
        gridMargin: 10,
        marginLeft: 0,
        marginRight: 0,
        isShowAdd: false,
        showDelete:false,
    };

    _gridClick = (item, index) => {
        if (typeof (this.props.gridClick) === 'function') {
            this.props.gridClick();
        }
    }

    _addGrid = () => {
        if (typeof (this.props.addGrid) === 'function') {
            this.props.addGrid();
        }
    }

    _getGridStyle = (index) => {
        let isFirstRow = index < this.columns //第一行
        let isLastRow = index >= this.totalCount - this.totalCount % this.columns //最后一行
        // let isFirstColumn = (index + 1) % this.columns === 1 //第一列
        let isLastColumn = (index + 1) % this.columns === 0 //最后一列
        return {
            width: this._gridWidth,
            height: this._gridWidth,
            marginTop: isFirstRow ? 0 : this.props.gridMargin,
            marginRight: isLastColumn ? 0 : this.props.gridMargin,
            marginBottom: isLastRow ? 0 : this.props.gridMargin,
        }
    }

    _deleteClick = (item, index) => {
        if (typeof (this.props.deleteClick) === 'function') {
            this.props.deleteClick();
        }
    }

    _renderAddButton = () => {
        let gridStyle = this._getGridStyle(this.totalCount - 1);
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.addButton, {
                    ...gridStyle
                }]}
                onPress={this._addGrid}
            >
                <View style={{ backgroundColor: "#D8D8D9", width: 40, height: 2 }} />
                <View style={{ backgroundColor: "#D8D8D9", height: 40, width: 2, position: 'absolute' }} />
            </TouchableOpacity>
        )
    }

    _renderGrid = (item, index) => {
        let gridStyle = this._getGridStyle(index)
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this._gridClick.bind(this, item, index)}>
                <Image
                    resizeMode={this.props.resizeMode}
                    source={item}
                    style={{
                        ...gridStyle
                    }}
                />
                {
                    this.props.showDelete ? <TouchableOpacity
                        activeOpacity={1}
                        style={styles.deleteButton}
                        onPress={this._deleteClick}>
                        <Text style={styles.deleteX}>×</Text>
                    </TouchableOpacity> : <View />
                }

            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.props.children)
        return (
            <View style={[styles.container, this.props.containerStyle, { marginLeft: this.props.marginLeft, marginRight: this.props.marginRight }]}>
                {
                    this.props.imgs.map((item, index) => {
                        return this._renderGrid(item, index);
                    })
                }
                {
                    this.props.isShowAdd ? this._renderAddButton() : <View />
                }
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D8D8D9',
    },
    deleteButton: {
        width: 22,
        height: 22,
        top: -11,
        right: 0,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 25,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#d8d8d8",
    },
    deleteX: {
        color: "#ffffff",
        fontSize: 20,
        backgroundColor: "transparent"
    }
})