import React from 'react';

import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import {Status} from "../../../config/api/api.config";
import {Dialog, ErrorPage, Loading} from "../../components";
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar, Divider, Icon} from "react-native-elements";
import _ from 'lodash'

class TaskDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.taskDetail = ['getInspectionTaskDetail', 'getMaintenanceTaskDetail'];
        this.dealFun = ['inspectiontaskDeal', 'maintenancetaskDeal'];
        this.dealDetailFun = ['inspectiontaskDealDetail', 'maintenancetaskDealDetail'];
        this.headerTitle = ['巡检任务详情', '维保任务详情'];
        this.type = 0;
    }

    componentDidMount() {
        let params = {'ITEM_ID': this.props.navigation.state.params.ITEM_ID};
        this.type = this.props.navigation.state.params.type;
        this.store.dispatch(Actions.request(this, Urls.Task[this.taskDetail[this.type]], params)); // 请求
    }

    _header = () => {
        return {
            title: this.headerTitle[this.type],
            onLeftPress: () => {
                this.props.navigation.state.params.onComplete();
                return false
            }
        }
    };

    _renderCardStatus = (status) => {
        let st = {text: '待执行', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        if (status === 0) st = {text: '待执行', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        else if (status === 1) st = {text: '执行中', color: '#FAA346', backgroundColor: '#FEF5EB'};
        else st = {text: '已完成', color: '#1AAD19', backgroundColor: '#E8F6E8'};
        return (
            <View style={[styles.cardStatus, {backgroundColor: st.backgroundColor}]}>
                <Text style={{color: st.color, fontSize: 12}}>{st.text}</Text>
            </View>
        )
    };

    _keyExtractor = (item, index) => index;

    _renderUndoItem = ({item}) => {
        let itemParams = {
            'ITEM_CONTENT_ID': item.ID, // 巡检内容id
            'ITEM_ID': this.props[this.taskDetail[this.type]].ID, //巡检点id
            'TASK_ID': this.props[this.taskDetail[this.type]].TASK_ID,
            'COMPANY_ID': this.props[this.taskDetail[this.type]].COMPANY_ID
        };
        let dialogText = ['巡检', '维保'];
        return (
            <TouchableOpacity style={styles.doItemContent} onPress={() => {
                this.props.navigation.navigate('TaskUpload', {
                    type: this.type,
                    itemParams: itemParams,
                    onComplete: () => {
                        let params = {'ITEM_ID': this.props.navigation.state.params.ITEM_ID};
                        this.store.dispatch(Actions.request(this, Urls.Task[this.taskDetail[this.type]], params)); // 请求
                    }
                })
            }}>
                <Icon
                    name='check-box-outline-blank'
                    type='materialIcons'
                    color='#D2D5DB'
                    onPress={() => {
                        Dialog.showInput(`${dialogText[this.type]}正常`, `请输入${dialogText[this.type]}反馈（若无可不填）`, (input) => {
                            let params = {
                                'ITEM_CONTENT_ID': item.ID, // 巡检内容id
                                'ITEM_ID': this.props[this.taskDetail[this.type]].ID, //巡检点id
                                'TASK_ID': this.props[this.taskDetail[this.type]].TASK_ID,
                                'COMPANY_ID': this.props[this.taskDetail[this.type]].COMPANY_ID,
                                'DESCRIBE': input,
                                'HANDLE_TYPE': 0,
                            };
                            Utils.fetch(this, Urls.Task[this.dealFun[this.type]], params).then((data) => {
                                let params = {'ITEM_ID': this.props.navigation.state.params.ITEM_ID};
                                this.store.dispatch(Actions.request(this, Urls.Task[this.taskDetail[this.type]], params));
                            });
                        });
                    }}
                />
            </TouchableOpacity>
        )
    };

    _renderDoItem = ({item, index}) => {
        let color = ['#eeeeee', '#FFAE32', '#42BB55', '#2384E8'];// 0未巡检 1异常 2正常3未确定
        return (
            <View>
                <TouchableOpacity style={styles.doItemContent} onPress={() => {
                    let params = {'ID': item.ID};
                    Utils.fetch(this, Urls.Task[this.dealDetailFun[this.type]], params).then((data) => {
                        console.log(data)
                        if (item.STATUS === 2) {
                            // 正常 弹出popup

                        } else {
                            // 异常 进入异常详情页面
                            this.props.navigation.navigate('TaskDealDetail', {
                                data: data
                            });
                        }
                    });
                }}>
                    <Icon
                        size={18}
                        name={'check-square'}
                        type='feather'
                        color={color[item.STATUS]} // 0未巡检 1异常 2正常 3未确定
                    />
                    <Text style={[styles.text, {marginLeft: 5}]}>{item.CONTENT}</Text>

                </TouchableOpacity>
                {this.state.discribe && i === index && <Text>{this.state.discribe}</Text>}
            </View>
        )
    };

    _renderUndo = (undoList) => (
        <View>
            <View style={{backgroundColor: '#FEF5EE', height: 25, justifyContent: 'center'}}>
                <Text style={{color: '#666', fontSize: 12, marginLeft: 10}}>未完成</Text>
            </View>
            <FlatList
                data={undoList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderUndoItem}
                ItemSeparatorComponent={() => (
                    <Divider style={{backgroundColor: '#ddd'}}/>
                )}
            />
        </View>
    )

    _renderDo = (doList) => (
        <View>
            <View style={{backgroundColor: '#E8F6E8', height: 25, justifyContent: 'center'}}>
                <Text style={{color: '#666', fontSize: 12, marginLeft: 10}}>已完成</Text>
            </View>
            <FlatList
                data={doList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderDoItem}
                ItemSeparatorComponent={() => (
                    <Divider style={{backgroundColor: '#ddd'}}/>
                )}
            />
        </View>
    )

    _render() {
        const detail = this.props[this.taskDetail[this.type]];
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
            // detail.CONTENTS.STATUS === 0 未巡检
            let undoList = _.filter(detail.CONTENTS, (val) => {
                return val.STATUS === 0;
            });
            let doList = _.filter(detail.CONTENTS, (val) => {
                return val.STATUS !== 0;
            });
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.detail}>
                        <View style={styles.tag1}>
                            <View style={styles.tag1}>
                                <Avatar
                                    medium
                                    rounded
                                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                                    activeOpacity={0.7}
                                />
                                <View
                                    style={{justifyContent: 'space-around', alignItems: 'flex-start', marginLeft: 20}}>
                                    <Text style={[styles.text, {fontSize: 16}]}>{detail.TASK_NUMBER}</Text>
                                    <Text
                                        style={[styles.text, {
                                            fontSize: 14,
                                            marginTop: 5
                                        }]}>截止时间：{detail.VALID_TIME}</Text>
                                </View>
                            </View>
                            {this._renderCardStatus(detail.STATUS)}
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>场站名称</Text>
                            <Text style={styles.text}>{detail.STATION_NAME}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>设备</Text>
                            <Text style={styles.text}>{detail.EQUIPMENT_NAME}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>巡检人</Text>
                            <Text style={styles.text}>{detail.USER_NAME}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.contentTitle}>
                            <Text>巡检内容</Text>
                        </View>
                        {this._renderUndo(undoList)}
                        {this._renderDo(doList)}
                    </View>
                </ScrollView>
            )
        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage/>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        getMaintenanceTaskDetail: state.Task.getMaintenanceTaskDetail,
        getInspectionTaskDetail: state.Task.getInspectionTaskDetail,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(TaskDetailScreen);


const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    detail: {
        backgroundColor: 'white'
    },
    text: {
        color: '#333333',
        fontSize: 15
    },
    tag1: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 44,
        paddingLeft: 10,
        paddingRight: 10
    },
    tip: {
        marginTop: 10,
        backgroundColor: '#ECF6FD',
        width: 45,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    tipText: {
        color: '#47A9EB',
        fontSize: 10,
    },
    content: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    contentTitle: {
        height: 44,
        marginLeft: 10,
        justifyContent: 'center'
    },
    doItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        paddingLeft: 10
    },
    cardStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
        width: 50,
        borderRadius: 20
    }
});
