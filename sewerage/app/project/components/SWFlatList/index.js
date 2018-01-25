/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from "react-native"
import PropTypes from 'prop-types';
import * as Utils from '../../../core/utils';

export class SWFlatList extends Component {
    constructor(props) {
        super(props)
        // this.containerHeight = 0;
        this.contentHeight = 0
        this.offset = 0

        this.state = {
            containerHeight:0,
        }
    }

    static propTypes = {
        reachedThreshold: PropTypes.number,//上拉刷新触发距离
        pullUpControl: PropTypes.any, //上拉刷新控件
        pullingUp: PropTypes.bool,
        refreshing: PropTypes.bool,
        onRefresh: PropTypes.func,
        pullUp: PropTypes.func,
    };

    static defaultProps = {
        reachedThreshold: 50,
    };

    // componentDidMount() {
    //     console.log('componentDidMount');
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pullingUp === false) {
            if (this.offset - (this.outDistance()) > 0) {
                this._flatList.scrollToOffset({ offset: this.outDistance(), animated: true })
            }
        }
    }

    //内容超出scrollview的距离
    outDistance = () => {
        //大于零，说明有内容在界面外
        let outDistance = this.contentHeight - this.state.containerHeight;
        // return outDistance
        return outDistance > 0 ? outDistance : 0;
    }

    _showPullControl = () => {
        if (this.props.pullingUp) {
            if (this.offset - this.outDistance() >= 0) {
                this._flatList.scrollToOffset({ offset: this.outDistance() + this.props.reachedThreshold, animated: true })
            }
        }
    }

    //scrollview and flatlist func

    _onScroll = (e) => {
        this.offset = e.nativeEvent.contentOffset.y;
        if (this.props.reachedThreshold < 0) {
            // if(this.offset)
        }
    }

    _onLayout = (event) => {
        this.setState({
            containerHeight: event.nativeEvent.layout.height
        })
        // this.state.containerHeight = event.nativeEvent.layout.height;
    }

    _onContentSizeChange = (contentWidth, contentHeight) => {
        this.contentHeight = contentHeight;
    }

    _onScrollEndDrag = () => {
        if (this.offset - this.outDistance() > this.props.reachedThreshold && !this.props.pullingUp) {
            this.props.pullUp();
            if(!this._isContentTooShort()){
                this._flatList.scrollToOffset({ offset: this.outDistance() + this.props.reachedThreshold, animated: true })
            }
        }
        this._showPullControl();
    }

    _pullUpControl = () => {
        if (this.props.pullUpControl) {
            return this.props.pullUpControl
        } else {
            return <View style={[styles.pullUpControl]}>
                <ActivityIndicator animating={true} color='#42BD56' size="small" />
                {/* <Text>刷新中...</Text> */}
            </View>
        }
    }

    _isContentTooShort= () => {
        return this.state.containerHeight - this.contentHeight - this.props.reachedThreshold > 0
    }

    _marginTop=()=>{
        if(this._isContentTooShort()) {
            return this.contentHeight;
        }else{
            console.log(this.state.containerHeight - this.props.reachedThreshold)
            return this.state.containerHeight - this.props.reachedThreshold;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.pullingUp ? <View style={{height:this.props.reachedThreshold,top:this._marginTop(),position:'absolute',left:0,right:0}}>
                        {this._pullUpControl()}
                    </View> : <View />
                }
                <FlatList
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999999999999999 }}
                    {...this.props}
                    ref={(flatList) => this._flatList = flatList}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={this.props.onRefresh}
                            tintColor="#42BD56"
                            colors={['#42BD56']}
                            progressBackgroundColor="#f1f1f1"
                        />
                    }
                    onLayout={this._onLayout}
                    onMomentumScrollStart={this._onMomentumScrollStart}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onRefresh={null}
                    onScroll={this._onScroll}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onTouchEnd={this._onTouchEnd}
                    onContentSizeChange={this._onContentSizeChange}
                />
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    pullUpControl: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})