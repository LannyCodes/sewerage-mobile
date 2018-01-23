import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
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
import PropTypes from 'prop-types';
import { ListFilter, TagLabel, Loading, SWFlatList } from '../../components';
import { StatusHelper } from '../faults/utils';
import _ from 'lodash'

// import {FaultDetailScreen, WorkOrderDetailScreen} from '../dataStatistics';

class ListCell extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.item;
    }

    static propTypes = {
        clickFunc: PropTypes.func
    };

    _clickFunc = () => {
        if (typeof (this.props.clickFunc) === 'function') {
            this.props.clickFunc()
        }
    }

    render() {
        let { perform, text } = StatusHelper.getRankPerform(this.data.rank);
        return (
            <TouchableOpacity
                style={styles.cellContainer}
                activeOpacity={1}
                onPress={this._clickFunc}>
                <View style={styles.cellHeader}>
                    <Text style={styles.cellTitle}>{this.data.title}</Text>
                    <View style={styles.cellTagContainer}>
                        {
                            _.isUndefined(this.data.rank) ? <View /> : <TagLabel backgroundColor={perform.backgroundColor} fontColor={perform.color}>{text}</TagLabel>
                        }
                        <TagLabel containerStyle={{ marginLeft: 10 }}>处理中</TagLabel>
                    </View>
                </View>
                <View style={styles.cellContentContainer}>
                    <Text
                        style={styles.cellContent}
                        numberOfLines={1}>{this.data.content}</Text>
                </View>
                <View style={styles.cellFootContainer}>
                    <Text style={styles.footText}>上报人：{this.data.person}</Text>
                    <View>
                        {/* <Icon
                            name="ei-clock"
                            type="evilicon"
                            color="#999999"/> */}
                        <Text style={styles.footText}>{this.data.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

class FaultListScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false,
            isRefreshing: false,
            workderFilter: {},
            faultFilter: {},
            currentTab: 0,
        }
    }

    componentDidMount() {
        this._refreshFaultList();
        this._refreshWorkOrders();
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

    _keyExtractor = (item, index) => item.index;

    _cellClicked = (type) => {
        if (type === 'faultsList') {
            this.props.navigation.navigate('FaultDetail');
        } else {
            this.props.navigation.navigate('WorkOrderDetail');
        }
    }

    _rightHeaderClick = () => {
        this.setState({
            isFilterShow: !this.state.isFilterShow
        })
    }

    //清单
    _refreshFaultList = () => {
        let params = {
            pageIndex: 1,
            pageSize: 15,
        }
        this._requestFaultsList(params);
    }

    _requestFaultsList = (params) => {
        this.store.dispatch(Actions.get(this, Urls.faults.faultList, params));
    }

    //清单列表上拉刷新
    _faultsListPullUp = () => {
        // this._requestFaultsList(this.props.faultsListRequest.body);
    }

    //工单
    _refreshWorkOrders = () => {
        let params = {
            pageIndex: 1,
            pageSize: 15,
        }
        this._requestWorkorders(params);
    }

    _requestWorkorders = (params) => {
        this.store.dispatch(Actions.get(this, Urls.faults.workOrder));
    }

    //工单列表上拉刷新
    _workorderPullUp = () => {
        // this._requestFaultsList(this.props.workOrderRequest.body);
        // console.log('hahaahah')
    }

    _filterReset = (data) => {

    }

    _filterConfirm = (data) => {
        let filter = {};
        this.state.currentTab ? filter.faultFilter = data : filter.workderFilter = data;
        this.setState({
            isFilterShow: false,
            ...filter,
        })
    }

    _filterInitails = () => {
        return this.state.currentTab === 0 ? this.state.workderFilter : this.state.faultFilter
    }

    _tabChanged = ({ i }) => {
        this.setState({
            currentTab: i
        })
    }

    _renderList(type, tabLabel, data) {
        let refreshing;
        let onRefresh;
        let pullUp;
        if (type === 'faultsList') {
            refreshing = this.props.faultsListRequest.isFetching;
            onRefresh = this._refreshFaultList;
            pullUp = this._faultsListPullUp;
        } else {
            refreshing = this.props.workOrderRequest.isFetching;
            onRefresh = this._refreshWorkOrders;
            pullUp = this._workorderPullUp;
        }
        return (
            <SWFlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
                pullUp={pullUp}
                style={{ flex: 1 }}
                keyExtractor={this._keyExtractor}
                tabLabel={tabLabel}
                ItemSeparatorComponent={() => {
                    return (
                        <Divider />
                    )
                }}
                data={data}
                renderItem={({ item, index }) => {
                    let data = item
                    if (type === 'faultsList') {
                        data.title = item.EQUIPMENT_NAME;
                        data.content = item.BREAKDOWN_DESCRIBE;
                        data.person = item.CREATE_USER;
                        data.time = item.CREATE_TIME;
                        data.rank = item.RANK;
                    } else {
                        data.title = item.BREAK_NUMBER;
                        data.content = item.DESCRIBE;
                        data.person = item.USER_NAME;
                        data.time = item.CREATE_TIME;
                    }
                    return <ListCell
                        item={data}
                        index={index}
                        clickFunc={this._cellClicked.bind(this, type)} />
                }}
            />
        )
    }

    _render() {
        // if(!Loading.checkData(this.props.faultsList)) return;
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
                    {
                        this._renderList('workOrder', '故障工单', this.props.workOrderRequest.workOrders)
                    }
                    {
                        this._renderList('faultsList', '故障清单', this.props.faultsListRequest.faultsList)
                    }
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
    },
    //ListCell
    cellContainer: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        height: 100,
        backgroundColor: '#ffffff',
    },
    cellHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cellTitle: {
        fontSize: 16,
        color: '#333333',
    },
    cellTag: {
        height: 22,
        marginTop: 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "transparent",
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellTagContainer: {
        flexDirection: 'row',
    },
    cellTagText: {
        backgroundColor: 'transparent',
        fontSize: 12
    },
    cellContentContainer: {
        marginTop: 8,
    },
    cellContent: {
        fontSize: 14,
        color: '#666666'
    },
    cellFootContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    footText: {
        fontSize: 12,
        color: '#999999',
    }
})

const filterArray = [
    {
        title: '状态',
        keyName: 'status',
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