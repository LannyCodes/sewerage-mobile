import React from 'react';

import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import {Status} from "../../../config/api/api.config";
import {ErrorPage, Loading} from "../../components";
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar, Divider, Icon} from "react-native-elements";
import _ from 'lodash'

class TaskMaintenanceDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        console.log(this.props.maintenanceTaskDetail)
        this.header = {
            title: "任务详情",
        };
        this.state = {
            undoList: [],
            doList: [],
        }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(this,Urls.Task.getMaintenanceTaskDetail)); // 请求
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                undoList: nextProps.maintenanceTaskDetail.unDo,
                doList: nextProps.maintenanceTaskDetail.do
            })
        }
    }

    _keyExtractor = (item, index) => index;

    _renderUndoItem = ({item}) => (
        <TouchableOpacity style={styles.doItemContent} onPress={() => {
            this.props.navigation.navigate('TaskMaintenanceUpload', {
                errorId: item,
                onComplete: (error: {}) => {
                    console.log(error)
                    this._moveUndo(error.errorId);
                }
            })
        }}>
            <Icon
                name='check-box-outline-blank'
                type='materialIcons'
                color='#D2D5DB'
                onPress={() => {
                    this._moveUndo(item);
                }}
            />
            <Text style={[styles.text, {marginLeft: 5}]}>{item}</Text>
        </TouchableOpacity>
    );
    _moveUndo = (item) => {
        // 在undoList 删除点击的item
        let unDoList = _.remove(this.state.undoList, function (n) {
            return n === item;
        });
        this.setState({
            unDoList: unDoList
        });
        //   在doList 添加点击的item
        this.state.doList.push(item);
    }

    _renderDoItem = ({item}) => (
        <View style={styles.doItemContent}>
            <Text style={[styles.text, {marginLeft: 5}]}>{item}</Text>
        </View>
    );

    _renderUndo = () => (
        <View>
            <View style={{backgroundColor: '#FEF5EE', height: 25, justifyContent: 'center'}}>
                <Text style={{color: '#666', fontSize: 12, marginLeft: 10}}>未完成</Text>
            </View>
            <FlatList
                data={this.state.undoList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderUndoItem}
                ItemSeparatorComponent={() => (
                    <Divider style={{backgroundColor: '#ddd'}}/>
                )}
            />
        </View>
    )

    _renderDo = () => (
        <View>
            <View style={{backgroundColor: '#E8F6E8', height: 25, justifyContent: 'center'}}>
                <Text style={{color: '#666', fontSize: 12, marginLeft: 10}}>已完成</Text>
            </View>
            <FlatList
                data={this.state.doList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderDoItem}
                ItemSeparatorComponent={() => (
                    <Divider style={{backgroundColor: '#ddd'}}/>
                )}
            />
        </View>
    )

    _render() {
        const detail = this.props.maintenanceTaskDetail;
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;
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
                                <View style={{justifyContent: 'space-around', alignItems: 'center', marginLeft: 20}}>
                                    <Text style={[styles.text, {fontSize: 16}]}>{detail.title}</Text>
                                    <Text
                                        style={[styles.text, {fontSize: 14, marginTop: 5}]}>截止时间：{detail.endTime}</Text>
                                </View>
                            </View>
                            <View style={styles.tip}>
                                <Text style={styles.tipText}>执行中</Text>
                            </View>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>设备</Text>
                            <Text style={styles.text}>{detail.device}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>巡检人</Text>
                            <Text style={styles.text}>{detail.xjperson}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, {color: '#666'}]}>运营公司</Text>
                            <Text style={styles.text}>{detail.company}</Text>
                        </View>
                        <Divider style={{backgroundColor: '#ddd'}}/>
                        <View style={{padding: 10}}>
                            <Text style={[styles.text, {color: '#666', marginBottom: 8}]}>任务描述</Text>
                            <Text style={styles.text}>{detail.taskDes}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.contentTitle}>
                            <Text>巡检内容</Text>
                        </View>
                        {this._renderUndo()}
                        {this._renderDo()}
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
        maintenanceTaskDetail: state.Task.getMaintenanceTaskDetail,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(TaskMaintenanceDetailScreen);


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
    }

})
