import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { SearchBar, Divider, Icon, Avatar } from 'react-native-elements';
import * as Utils from "../../../core/utils";
import { WrapScreen } from "../wrap";
import { ListFilter } from '../../components';

const filterArray = [
    {
        title: '类型',
        keyName: 'ssb',
        multipleChoice:false,
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
        multipleChoice:true,
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
        multipleChoice:false,
        data: [{
            name: '规格一',
            value: '11',
        }, {
            name: '规格二',
            value: '22',
        }, {
            name: '规格三',
            value: '33',
        }]
    }
];

export default class DeviceQueryScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false
        }
    }

    static defaultProps = {
        header: 'none'
    }

    _keyExtractor = (item, index) => item.id;

    //渲染单行
    _renderItem = () => {
        return (
            <View style={styles.listItem}>
                <Avatar
                    width={50}
                    height={50}
                    title="CWL"
                    rounded
                    containerStyle={styles.listAvatar}
                />
                <View style={styles.listItemMsg}>
                    <View style={styles.listItemTitleContainer}>
                        <Text style={styles.listItemName}>渗滤液设备名称</Text>
                        <Text style={styles.listItemNumbering}>ZL-SLY-021-212</Text>
                    </View>
                    <Text style={styles.listItemContent}>所属厂站：湖南</Text>
                </View>
            </View>
        )
    }

    _render() {
        let self = this
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.navigation}>
                        <View style={styles.navigator}>
                            <Icon
                                style={{ marginLeft: 10 }}
                                size={26}
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
                                size={26}
                                name={'chevron-left'}
                                type='feather'
                                color={'#666'}
                                onPress={() => {
                                    self.setState({
                                        isFilterShow: !self.state.isFilterShow
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <SearchBar
                        containerStyle={styles.searchBar}
                        inputStyle={{
                            backgroundColor: '#ffffff',
                            borderWidth: 1,
                            borderColor: "#e6e6ea",
                            height: 36,
                            fontSize: 14,
                        }}
                        icon={{
                            color: '#8E8E93',
                            style: {
                                fontSize: 20,
                                fontWeight: "bold",

                            }
                        }}
                        placeholder='搜索'
                    />
                </View>
                <Divider style={{ backgroundColor: '#e0e0e0' }} />
                <FlatList
                    data={['s', 's', 'd', 'd', 'd', 'd']}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                {this.state.isFilterShow === true ? <ListFilter
                    containerStyles={{ top: 121 }}
                    filterArray={filterArray}
                    maskerClick={() => {
                        this.setState({
                            isFilterShow:false,
                        })
                    }}
                /> : <View />}
            </View>
        )
    }
}

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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navigatorTitle: {
        fontSize: 17,
        color: '#323232',
        lineHeight: 24,
    },
    searchBar: {
        backgroundColor: '#f9f9f9',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    //
    listItem: {
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
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