/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    FlatList,
    RefreshControl,
} from "react-native"

export class SWFlatList extends Component {
    constructor(props) {
        super(props)
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
                onRefresh={null}
                onEndReached={this.props.pullUp}
                onEndReachedThreshold={0.1}
            />
        )
    }
}