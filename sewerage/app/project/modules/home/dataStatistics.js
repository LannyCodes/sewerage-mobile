import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { ScrollableTabBar } from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { DataStatisticsView } from '../dataStatistics/components';

export default class DataStatisticsScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "数据统计",
        }
    }
    _render() {
        return (
            <ScrollableTabView
                // locked={true}
                renderTabBar={() =>
                    <ScrollableTabBar
                        style={{ height: 50 }}
                        tabStyle={{ height: 50 }}
                        activeTextColor='#42BB55'
                        inactiveTextColor='#333333'
                        backgroundColor="#fff"
                        underlineAlignLabel={true}
                        underlineStyle={{ backgroundColor: '#42BB55', height: 2 }}
                    />
                }
            >
                <DataStatisticsView
                    tabLabel="巡检统计" />
                <DataStatisticsView
                    tabLabel="维保统计" />
                <DataStatisticsView
                    tabLabel="厂站统计" />
            </ScrollableTabView>
        )
    }
}
