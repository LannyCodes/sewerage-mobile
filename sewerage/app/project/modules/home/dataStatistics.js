import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Dimensions,
    PixelRatio,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { ScrollableTabBar } from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { DataStatisticsView } from '../dataStatistics/components';
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";
import { ChartView } from '../dataStatistics/components';
import Orientation from 'react-native-orientation';
const pixel = PixelRatio.get();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class DataStatisticsScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "数据统计",
        },
            this.state = {
                option: {},
                isExpand: false,
                statusBarHidden:false,
            }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(this, Urls.statistics.inspectionStatistics));
        this.store.dispatch(Actions.request(this, Urls.statistics.maintenanceStatistics));
        this.store.dispatch(Actions.request(this, Urls.statistics.stationStatistics));
    }

    //func 

    _expandFunc=(option )=> {
        console.log('_expandFunc');
        this.setState({
            option: option,
            isExpand:true,
        })
        // this._turnOrientation()
        StatusBar.setHidden(true);
        this.props.navigation.setParams({
            gesturesEnabled:false,
            // statusBarHidden:true,
        })
    }

    _turnOrientation = () => {
        Orientation.getOrientation((err,orientation)=>{
            if(orientation === 'PORTRAIT'){
                Orientation.lockToLandscapeRight();
            }else{
                Orientation.lockToPortrait();
            }
        })
    }

    _unExpand=()=>{
        // this._turnOrientation()
        this.setState({
            isExpand:false,
        })
        StatusBar.setHidden(false);
        this.props.navigation.setParams({
            gesturesEnabled:true,
            // statusBarHidden:false,
        })
        // this._chartView.reload()
    }

    _render() {
        const offset = (screenHeight-screenWidth)/2
        return (
            <View style={{ flex: 1, }}>
                {
                    this.state.isExpand ?
                        <View style={{ position: 'absolute', zIndex: 99999, top: -70, paddingTop: 20, backgroundColor: '#ffffff',transform:[{rotateZ:'90deg'},{translate:[offset,offset]}] }}>
                            <ChartView
                                ref={chartView => this._chartView = chartView}
                                height={screenWidth-38}
                                width={screenHeight}
                                expand={this._unExpand}
                                echartOption={this.state.option} />
                        </View> :
                        <View />
                }
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
                        navigation={this.props.navigation}
                        expandFunc={this._expandFunc} />
                    <DataStatisticsView
                        tabLabel="维保统计"
                        data={this.props.maintenanceDatas}
                        navigation={this.props.navigation}
                        expandFunc={this._expandFunc} />
                    <DataStatisticsView
                        tabLabel="厂站统计"
                        data={this.props.stationDatas}
                        navigation={this.props.navigation}
                        expandFunc={this._expandFunc} />
                </ScrollableTabView>
            </View>
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