/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    ViewPropTypes,
    TouchableOpacity,
} from "react-native"
import * as Utils from '../../core/utils';
import PropTypes from 'prop-types';

/*
    用法
    this.pageControl.setIndex = index;//设置哪个点高亮
    style //属性可以修改背景色和位置
    <PageControl ref={(pageControl)=>{this._pageControl=pageControl}}/>
    目前dot只有一种样式，待以后添加样式修改
*/

class PageControlDot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: props.selected,
        }
    }

    static propTypes = {
        index: PropTypes.number,
        selected: PropTypes.bool,
        style: ViewPropTypes.style,
        color: PropTypes.string,
        selectedColor: PropTypes.string,
    };

    static defaultProps = {
        index: 0,
        selected: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.state.isSelected) {
            this.setState({
                isSelected: nextProps.selected
            })
        }
    }

    _dotClicked = () => {

    }

    render() {
        let backgroundColor = !this.state.isSelected ? this.props.color : this.props.selectedColor;
        return (
            <TouchableOpacity
                onPress={this._dotClicked}>
                <View style={[ {width:this.props.width,height:this.props.height, backgroundColor: backgroundColor, marginLeft: this.props.index > 0 ? this.props.margin : 0 }]} />
            </TouchableOpacity>
        )
    }
}

export class PageControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index != this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.index,
            })
        }
    }

    static propTypes = {
        dotsNum: PropTypes.number,
        color: PropTypes.string,
        selectedColor: PropTypes.string,
        dotWidth: PropTypes.number,
        dotHeight: PropTypes.number,
        dotMargin:PropTypes.number
    };

    static defaultProps = {
        dotsNum: 2,
        index: 0,
        dotWidth: 20,
        dotHeight: 2,
        dotMargin:4,
    };

    setIndex = (index: number) => {
        this.setState({
            selectedIndex: index,
        })
    }

    render() {
        let dots = [];
        let dotsNum = this.props.dotsNum;
        dotsNum = dotsNum < 1 ? 1 : dotsNum;
        for (var index = 0; index < this.props.dotsNum; index++) {
            dots.push(<PageControlDot
                key={index}
                index={index}
                color={this.props.color}
                width={this.props.dotWidth}
                height={this.props.dotHeight}
                margin={this.props.dotMargin}
                selectedColor={this.props.selectedColor}
                selected={this.state.selectedIndex === index ? true : false} />)
        }
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={[styles.dotContainer]}>
                    {dots}
                </View>
            </View>

        )
    }
}

const styles = Utils.PLStyle({
    container: {
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
    },
    dotContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dot: {
        width: 20,
        height: 2,
    }
})