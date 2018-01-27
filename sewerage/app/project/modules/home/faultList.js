import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { WrapScreen } from "../wrap";
import * as Utils from "../../../core/utils";
import { ScrollableTabBar } from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";
import { ListFilter } from '../../components';

import { FaultsList } from '../faults/components';
// import {FaultDetailScreen, WorkOrderDetailScreen} from '../dataStatistics';

class FaultListScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false,
            workderFilter: {},
            faultFilter: {},
            currentTab: 0,
        }
    }

    _header = () => {
        return {
            title: "故障处理",
            right: {
                icon: 'filter',
                type: 'feather',
                color: this.state.isFilterShow || (this.state.currentTab === 0 && Object.keys(this.state.workderFilter).length > 0) || (this.state.currentTab === 1 && Object.keys(this.state.faultFilter).length > 0) ? '#42BD56' : '#666666',
                onPress: this._rightHeaderClick,
            }
        }
    }

    _rightHeaderClick = () => {
        this.setState({
            isFilterShow: !this.state.isFilterShow
        })
    }

    _requestFaultsList = (params) => {
        this.store.dispatch(Actions.get(this, Urls.faults.faultList, params));
    }

    _requestWorkorders = (params) => {
        this.store.dispatch(Actions.get(this, Urls.faults.workOrder, params));
    }

    //筛选操作
    _filterReset = (data) => {

    }

    _filterConfirm = (data) => {
        // let filter = {};
        // this.state.currentTab ? filter.faultFilter = data : filter.workderFilter = data;
        if (this.state.currentTab) {//清单
            // filter.faultFilter = data;
            this.setState({
                isFilterShow: false,
                faultFilter: data,
            })
            this._faultsList.filter = data;
            this._faultsList.refresh();
        } else {//工单
            // filter.workderFilter = data;
            this.setState({
                isFilterShow: false,
                workderFilter: data,
            })
            this._workorderList.filter = data;
            this._workorderList.refresh();
        }
    }

    _filterInitails = () => {
        return this.state.currentTab === 0 ? this.state.workderFilter : this.state.faultFilter
    }

    _tabChanged = ({ i }) => {
        this.setState({
            currentTab: i
        })
    }

    _render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    locked={true}
                    onChangeTab={this._tabChanged}
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
                    }>
                    {/* 故障工单 */}
                    <FaultsList
                        type='workOrder'
                        tabLabel='故障工单'
                        ref={workorderList => this._workorderList = workorderList}
                        // filter = {this.state.workderFilter}
                        navigation={this.props.navigation}
                        requestMsg={this.props.workOrderRequest}
                        requestAction={this._requestWorkorders}
                    />
                    {/* 故障清单 */}
                    <FaultsList
                        type='faultsList'
                        tabLabel='故障清单'
                        // filter={this.state.faultFilter}
                        ref={faultsList => this._faultsList = faultsList}
                        navigation={this.props.navigation}
                        requestMsg={this.props.faultsListRequest}
                        requestAction={this._requestFaultsList}
                    />

                </ScrollableTabView>
                {/* 在筛选出现的时候挡住scrolltabbar */}
                {this.state.isFilterShow === true ? <TouchableOpacity
                    style={styles.scrollTabBarMasker}
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            isFilterShow: false,
                        })
                    }} /> : <View />}
                {/* 筛选组件 */}
                {this.state.isFilterShow === true ? <ListFilter
                    containerStyles={{ top: 50 }}
                    filterArray={filterArray}
                    reset={this._filterReset}
                    confirm={this._filterConfirm}
                    initails={this._filterInitails()}
                    maskerClick={() => {
                        this.setState({
                            isFilterShow: false,
                        })
                    }}
                /> : <View />}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        faultsListRequest: state.faults.faultsListRequest,
        workOrderRequest: state.faults.workOrderRequest,
    }
}

export default connect(mapStateToProps)(FaultListScreen)


const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollTabBarMasker: {
        height: 50,
        width: '100%',
        position: 'absolute',
        top: 0,
        // backgroundColor:'red',
    }
})

const filterArray = [
    {
        title: '状态',
        keyName: 'STATUS',
        // multipleChoice: true,
        data: [{
            name: '待处理',
            value: '0',
        }, {
            name: '正在处理',
            value: '1',
        }, {
            name: '现场处理',
            value: '2',
        }, {
            name: '处理完成',
            value: '3'
        }]
    }
]