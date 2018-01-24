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
        this.containerHeight = 0;
        this.contentHeight = 0
        this.offset = 0
        // this.state = {
        //     isPullingUp:false,
        // }
    }

    static propTypes = {
        reachedThreshold: PropTypes.number,//上拉刷新触发距离
        pullUpControl: PropTypes.any, //上拉刷新控件
        pullingUp:PropsTypes.bool, 
        refreshing:PropsTypes.bool,
        onRefresh:PropsTypes.func,
        pullUp:PropsTypes.func,
    };

    static defaultProps = {
        reachedThreshold: 50,
    };

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.pullingUp === false){
            if (this.offset - (this.contentHeight - this.containerHeight) > 0) {
                this._flatList.scrollToOffset({ offset: this.contentHeight - this.containerHeight, animated: true })
            }
        }
    }

    //内容超出scrollview的距离
    outDistance = () => {
        //大于零，说明有内容在界面外
        let outDistance = this.contentHeight - this.containerHeight;
        return outDistance > 0 ? outDistance : 0;
    }

    _onScroll = (e) => {
        this.offset = e.nativeEvent.contentOffset.y;
        if (this.offset - this.outDistance() > this.props.reachedThreshold) {
            if (!this.props.pullingUp) {
                this.props.pullUp();
            }
        }
    }

    _onLayout = (event) => {
        this.containerHeight = event.nativeEvent.layout.height;
    }

    _onContentSizeChange = (contentWidth, contentHeight) => {
        this.contentHeight = contentHeight;
    }
    
    _onScrollEndDrag = () => {
        if (this.props.pullingUp) {
            console.log(this._flatList)
            this._flatList.scrollToOffset({ offset: this.contentHeight - this.containerHeight + this.props.reachedThreshold, animated: true })
        }
    }

    _pullUpControl=()=>{
        if(this.props.pullUpControl){
            return this.props.pullUpControl
        }else{
            return <View style={styles.pullUpControl}>
                <ActivityIndicator animating={true} color='#42BD56' size="small" />
                {/* <Text>刷新中...</Text> */}
            </View>
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                {
                    this.props.pullingUp ? <View >
                        {this._pullUpControl()}
                    </View> : <View />
                }
                <FlatList
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
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
                    onRefresh={null}
                    onScroll={this._onScroll}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onContentSizeChange={this._onContentSizeChange}
                />
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    pullUpControl:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    }
})