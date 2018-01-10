import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { ScrollableTabBar } from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class DataStatisticsScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "数据统计",
        }
    }
    _render() {
        return (
            <View/>
            // <ScrollableTabView
            //     locked={true}
            //     renderTabBar={() => {
            //         <ScrollableTabBar
            //             style={{ height: 50 }}
            //             tabStyle={{ height: 50 }}
            //             // scrollWithoutAnimation
            //             activeTextColor='#42BB55'
            //             inactiveTextColor='#333333'
            //             backgroundColor="#fff"
            //             underlineAlignLabel={true}
            //             underlineStyle={{ backgroundColor: '#42BB55', height: 2 }}
            //         />
            //     }}>

            // </ScrollableTabView>
        )
    }
}
