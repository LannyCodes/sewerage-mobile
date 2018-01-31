import React from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { SWFlatList,Loading } from '../../components';
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";
import * as Assets from '../../assets';
import * as Utils from '../../../core/utils';

class MessageScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.isPullDown = false;
        this.isPullUp = false;
    }

    _header = () => {
        return {
            title: '消息',
            left: {
                none: true,
            }
        }
    }

    componentDidMount() {
        this._onRefresh()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messageRequest.isFetching === false) {
            this.isPullDown = false;
            this.isPullUp = false;
        }
        this.store.dispatch(Actions.setTabBadge('Message', nextProps.messageRequest.unreadMessage))
    }

    _keyExtractor = (item, index) => index

    _itemClick = (item, index) => {
        this._changeMessageStatus(item.ID,0,index);
        this.store.dispatch(Actions.message.changeMessageListAtIndex(index));
        this.props.navigation.navigate('MessageDetail',{item:item});
    }

    _onRefresh = () => {
        let params = {
            pageIndex: 1,
            pageSize: 15,
            RECEIVE_USER_ID: _USERID_
        }
        this.isPullDown = true;
        this._requestMessageList(params);
    }

    _pullUp = () => {
        this.isPullUp = true;
        this._requestMessageList(this.props.messageRequest.body);
    }

    _requestMessageList = (param) => {
        this.store.dispatch(Actions.get(this, Urls.Message.messageList, param));
    }

    _deleteRow = (item,index) => {
        this._changeMessageStatus(item.ID,2,index);
        this.store.dispatch(Actions.message.deleteMessageListAtIndex(index));
    }

    _changeMessageStatus = async (id, status, index) => {
        let params = {
            ID: id,
            STATUS: status
        }
        try {
            let data = await Utils.post(this, Urls.Message.messageStatusUpdate, params);
        } catch (err) {
            console.log(err);
        }
    }

    _renderItem = ({ item, index }) => {
        let source;
        switch (item.TYPE) {
            case 1:
                source = Assets.Message.maintain
                break;
            case 2:
                source = Assets.Message.inspection
                break;
            case 3:
            default:
                source = Assets.Message.alert
                break;
        }

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={1}
                onPress={this._itemClick.bind(this, item, index)}>
                <View>
                    <Image source={source} style={styles.image} />
                    {
                        item.STATUS === 1 ? <View style={styles.unread} /> : <View />
                    }
                </View>
                <View style={styles.itemMsg}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.itemTitleText}>{item.TITLE}</Text>
                        <Text style={[styles.itemTitleText, { fontSize: 12 }]}>{item.SEND_DATE}</Text>
                    </View>
                    <Text
                        style={styles.itemContent}
                        numberOfLines={1}>
                        {item.CONTENT}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderHiddenItem = (rowData, rowMap) => {
        let self = this;
        return <View style={styles.rowBack}>
            <TouchableOpacity
                style={{ width: 150, backgroundColor: 'red' }}
                onPress={_ => {
                    Alert.alert(
                        '删除消息',
                        '删除后不可恢复',
                        [
                            {
                                text: '取消', onPress: () => {
                                    rowMap[rowData.index].closeRow();
                                }
                            },
                            {
                                text: '确定', onPress: () => {
                                    self._deleteRow(rowData.item,rowData.index);
                                    rowMap[rowData.index].closeRow()
                                }
                            }
                        ]
                    )

                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>Close</Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    _render() {
        return (
            <SWFlatList
                style={{ flex: 1 }}
                data={this.props.messageRequest.list}
                refreshing={this.props.messageRequest.isFetching && this.isPullDown}
                pullingUp={this.props.messageRequest.isFetching && this.isPullUp}
                pullUp={this._pullUp}
                onRefresh={this._onRefresh}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={<View style={{ height: 10, backgroundColor: '#f1f1f1' }} />}
                disableLeftSwipe={false}
                ItemSeparatorComponent={() => {
                    return <View style={{ backgroundColor: '#e5e5e5', height: 0.5, flex: 1, marginLeft: 20 }} />
                }}
                renderHiddenItem={this._renderHiddenItem}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        messageRequest: state.Message.messageRequest,
        // totalBadge: state.Common.tabBadge,
    }
}

export default connect(mapStateToProps)(MessageScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    itemContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 17,
        paddingBottom: 16,
        backgroundColor: '#ffffff',
    },
    itemMsg: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 9,
    },
    itemTitleText: {
        color: '#666666',
        fontSize: 14,
    },
    itemContent: {
        color: '#333333',
        fontSize: 14,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 15,
    },
    image: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        width: 40,
        height: 40
    },
    unread: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 20,
        backgroundColor: '#E44036',
        right: -5,
        top: -4
    }
})