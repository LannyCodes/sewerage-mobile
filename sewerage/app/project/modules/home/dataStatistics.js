import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { ScrollableTabBar } from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { DataStatisticsView } from '../dataStatistics/components';
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";

class DataStatisticsScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "数据统计",
        }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(this,Urls.statistics.inspectionStatistics));
        this.store.dispatch(Actions.request(this,Urls.statistics.maintenanceStatistics));
        this.store.dispatch(Actions.request(this,Urls.statistics.stationStatistics));
    }

    _render() {
        return (
            <ScrollableTabView
                locked={true}
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
                    tabLabel="巡检统计" 
                    data={this.props.inspectionDatas}
                    navigation={this.props.navigation}/>
                <DataStatisticsView
                    tabLabel="维保统计" 
                    data={this.props.maintenanceDatas}
                    navigation={this.props.navigation}/>
                <DataStatisticsView
                    tabLabel="厂站统计" 
                    data={this.props.stationDatas}
                    navigation={this.props.navigation}/>
            </ScrollableTabView>
        )
    }
}


function mapStateToProps(state) {
    return {
        inspectionDatas: state.dataStatistics.getInspectionDatas,
        maintenanceDatas: state.dataStatistics.getMaintenanceDatas,
        stationDatas: state.dataStatistics.getStationDatas
    }
}

export default connect(mapStateToProps)(DataStatisticsScreen);