import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { SearchBar, Divider, Icon, Avatar } from 'react-native-elements';
import * as Utils from "../../../core/utils";
import { WrapScreen } from "../wrap";
import { ListFilter, Loading, SWRefreshControl, SWFlatList } from '../../components';
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";

const filterArray = [
    {
        title: '类型',
        keyName: 'ssb',
        multipleChoice: false,
        data: [{
            name: '类型一',
            value: '11',
        }, {
            name: '类型二',
            value: '22',
        }, {
            name: '类型三',
            value: '33',
        }]
    },
    {
        title: '规格',
        keyName: 'aab',
        multipleChoice: true,
        data: [{
            name: '规格一',
            value: '11',
        }, {
            name: '规格二',
            value: '22',
        }, {
            name: '规格三',
            value: '33',
        }, {
            name: '规格四',
            value: '44',
        }]
    },
    {
        title: '规格',
        keyName: 'ccs',
        multipleChoice: false,
        data: [{
            name: '规格一',
            value: '11',
        }, {
            name: '规格二',
            value: '22',
        }]
    }
];

class DeviceQueryScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false,
        }
        this.isPullDown = false;
        this.isPullUp = false;
    }

    componentDidMount() {
        this._onRefresh();
    }

    _header = () => 'none'

    _keyExtractor = (item, index) => index;

    _itemClick = (item, index) => {
        this.props.navigation.navigate('DeviceDetail')
    }

    _searchConfirm = (event) => {
        console.log(event.nativeEvent.text);
    }

    _onRefresh = () => {
        this.isPullDown = true;
        let param = {
            pageIndex: 1,
            pageSize: 15,
        }
        this.store.dispatch(Actions.post(this, Urls.device.deviceList, param));
    }

    _pullUp = () => {
        this.isPullUp = true;
        this.store.dispatch(Actions.post(this, Urls.device.deviceList, this.props.deviceListRequest.body));
    }

    //渲染单行
    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.listItem}
                onPress={this._itemClick.bind(item, index)}>
                <Avatar
                    width={50}
                    height={50}
                    source={{ url: item.avatar }}
                    rounded
                    containerStyle={styles.listAvatar}
                />
                <View style={styles.listItemMsg}>
                    <View style={styles.listItemTitleContainer}>
                        <Text style={styles.listItemName}>{item.title}</Text>
                        <Text style={styles.listItemNumbering}>{item.deviceCode}</Text>
                    </View>
                    <Text style={styles.listItemContent}>所属厂站：{item.station}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _render() {
        let self = this
        // if(!Loading.isLoading(this.props.isFetching))return
        if (this.props.deviceListRequest.isFetching) {
            console.log(this.props.deviceListRequest.list)
        } else {
            console.log(this.props.deviceListRequest.list)
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.navigation}>
                        <View style={styles.navigator}>
                            <Icon
                                style={{ marginLeft: 10 }}
                                size={24}
                                name={'chevron-left'}
                                type='feather'
                                color={'#666'}
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                            />
                            <Text style={styles.navigatorTitle}>设备查询</Text>
                            <Icon
                                style={{ marginRight: 10 }}
                                size={18}
                                name={'filter'}
                                type='feather'
                                color={this.state.isFilterShow ? '#42BD56' : "#666"}
                                onPress={() => {
                                    self.setState({
                                        isFilterShow: !self.state.isFilterShow
                                    })
                                }}
                            />

                        </View>
                    </View>
                    <View style={styles.searchBarContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 30 }}>
                            <Icon
                                name="ios-search-outline"
                                type="ionicon"
                                color="#8E8E93"
                                size={20} />
                        </View>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="搜索"
                            placeholderTextColor="#97979b"
                            onSubmitEditing={this._searchConfirm}
                            returnKeyType="search"
                        />
                    </View>
                </View>
                <Divider style={{ backgroundColor: '#e0e0e0' }} />
                <SWFlatList
                    refreshing={this.props.deviceListRequest.isFetching && this.isPullDown}
                    onRefresh={this._onRefresh}
                    data={this.props.deviceListRequest.list}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    pullingUp={this.props.deviceListRequest.isFetching && this.isPullUp}
                    pullUp={this._pullUp}
                />
                {this.state.isFilterShow === true ? <ListFilter
                    containerStyles={{ top: 121 }}
                    filterArray={filterArray}
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
        deviceListRequest: state.device.deviceListRequest,
    }
}

export default connect(mapStateToProps)(DeviceQueryScreen);

const styles = Utils.PLStyle({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: "#f9f9f9",
        height: 120,
    },
    navigation: {
        height: 64,
        // backgroundColor:'red',
    },
    navigator: {
        marginTop: 32,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navigatorTitle: {
        fontSize: 17,
        color: '#323232',
        lineHeight: 24,
    },
    searchBarContainer: {
        flexDirection: 'row',
        height: 36,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#e6e6ea',
        borderWidth: 0.5,
        borderRadius: 4,
        backgroundColor: '#ffffff',
    },
    searchBar: {
        flex: 1,
        fontSize: 14,
        color: "#333333",
    },
    //
    listItem: {
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    listAvatar: {
        marginLeft: 20,
        marginRight: 20,
    },
    listItemMsg: {
        flexDirection: 'column',
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: '#e5e5e5',
        height: "100%",
        justifyContent: 'center',
    },
    listItemTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    listItemName: {
        fontSize: 16,
        color: '#333333',
        // fontFamily:''
    },
    listItemNumbering: {
        color: '#888888',
        fontSize: 12,
        marginRight: 10,
    },
    listItemContent: {
        color: '#888888',
        fontSize: 12,
    },
    //
    listFilter: {
        // flex:1,
        position: 'absolute',
        // top:0,
        width: '100%',
        top: 121,
        // width:100,
        height: '100%',
        // backgroundColor: 'rgba(0,0,0,0.48)',
        // backgroundColor:'red',
    }
})