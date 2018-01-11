import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
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
import { ListFilter,TagLabel } from '../../components';

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
        return (
            <TouchableOpacity
                style={styles.cellContainer}
                activeOpacity={1}
                onPress={this._clickFunc}>
                <View style={styles.cellHeader}>
                    <Text style={styles.cellTitle}>{this.data.title}</Text>
                    <View style={styles.cellTagContainer}>
                        <TagLabel>II级</TagLabel>
                        <TagLabel containerStyle={{marginLeft:10}}>处理中</TagLabel>
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
        this.header = {
            title: "故障处理",
            right: {
                icon: 'filter',
                type: 'feather',
                onPress: () => {
                    this.setState({
                        isFilterShow: !this.state.isFilterShow
                    })
                }
            }
        }
        this.state = {
            isFilterShow: false,
        }
    }

    static defaultProps = {

    }

    componentDidMount() {
        this.store.dispatch(Actions.request(Urls.faults.faultList));
        this.store.dispatch(Actions.request(Urls.faults.workOrder));
    }

    _keyExtractor = (item, index) => item.id;

    _cellClicked = (type) => {
        if(type === 'faultsList'){
            this.props.navigation.navigate('FaultDetail');
        }else{
            this.props.navigation.navigate('WorkOrderDetail');
        }
    }

    _filterReset = (data) => {

    }

    _filterConfirm = (data) => {

    }

    _tabChanged = ({ i }) => {

    }

    _renderList(type, tabLabel, data) {
        return (
            <FlatList
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
                        data.title = item.name
                    } else {
                        data.title = item.orderCode
                    }
                    return <ListCell
                        item={data}
                        index={index}
                        clickFunc={this._cellClicked.bind(this,type)} />
                }}
            />
        )
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
                    {
                        this._renderList('workOrder', '故障工单', this.props.workOrders)
                    }
                    {
                        this._renderList('faultsList', '故障清单', this.props.faultsList)
                    }
                </ScrollableTabView>
                {/* 在筛选出现的时候挡住scrolltabbar */}
                {this.state.isFilterShow === true ? <TouchableOpacity
                    style={styles.scrollTabBarMasker} 
                    activeOpacity={1}
                    onPress={()=>{
                        this.setState({
                            isFilterShow:false,
                        })
                    }}/> : <View />}
                {this.state.isFilterShow === true ? <ListFilter
                    containerStyles={{ top: 50 }}
                    filterArray={filterArray}
                    reset={this._filterReset}
                    confirm={this._filterConfirm}
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
        faultsList: state.faults.getFaultsList,
        workOrders: state.faults.getWorkOrder,
    }
}

export default connect(mapStateToProps)(FaultListScreen)


const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollTabBarMasker: {
        height:50,
        width:'100%',
        position:'absolute',
        top:0,
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
            value: '1',
        }, {
            name: '已完成',
            value: '2',
        }, {
            name: '废弃',
            value: '3',
        }]
    }
]