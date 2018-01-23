/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    FlatList,
    RefreshControl,
} from "react-native"
import PropTypes from 'prop-types';

export class SWFlatList extends Component {
    constructor(props) {
        super(props)
        this.containerHeight = 0;
        this.contentHeight = 0
    }

    static propTypes = {
        reachedThreshold:PropTypes.number,
    };

    static defaultProps = {
        reachedThreshold:50,
    };

    componentDidMount(){

    }



    //内容超出scrollview的距离
    outDistance=()=>{
        //大于零，说明有内容在界面外
        let outDistance = this.contentHeight - this.containerHeight;
        return  outDistance > 0 ? outDistance : 0;
    }

    _onScroll = (e) => {
        // console.log('henghengheng');
        console.log(e.nativeEvent.contentOffset.y);
        let offset = e.nativeEvent.contentOffset.y;
        if(offset - this.outDistance() > this.props.reachedThreshold){
            //TODO: 判断松手的时候
        }
    }

    render() {
        return (
            <FlatList
                {...this.props}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={this.props.onRefresh}
                        tintColor="#42BD56"
                        colors={['#42BD56']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }
                onLayout={(event)=>{
                    this.containerHeight = event.nativeEvent.layout.height;
                    console.log('hahahe');
                    console.log(this.containerHeight);
                }}
                onRefresh={null}
                // onEndReached={this.props.pullUp}
                // onEndReachedThreshold={-0.3}
                onScroll={this._onScroll}
                onContentSizeChange={(contentWidth, contentHeight)=>{
                    this.contentHeight = contentHeight;
                    console.log('heiheihei');
                    console.log(this.contentHeight);
                }}
            />
        )
    }
}