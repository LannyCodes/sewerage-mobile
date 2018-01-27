import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { connect } from "react-redux";
import * as Actions from '../../redux/actions'
import Urls from "../../../config/api/urls";
import * as Utils from "../../../core/utils";
import { Status } from "../../../config/api/api.config";
import { DefaultPage, ErrorPage, Loading } from "../../components";

class TaskListScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { qrData } = this.props.navigation.state.params || ''; // 获取参数
        let params = { 'EQUIPMENT_ID': qrData };
        this.store.dispatch(Actions.request(this, Urls.Task.getTaskList, params)); // 请求
    }

    _header = () => {
        return {
            title: "任务选择",
        }
    }

    _keyExtractor = (item, index) => index;

    _renderCardStatus = (status, type) => {
        let statusText = type === 0 ? ['待巡检', '正在巡检', '巡检完成'] : ['待维保', '正在维保', '维保完成']
        let st = { text: statusText[0], color: '#47A9EB', backgroundColor: '#ECF6FD' };
        if (status === 0) st = { text: statusText[0], color: '#47A9EB', backgroundColor: '#ECF6FD' };
        else if (status === 1) st = { text: statusText[1], color: '#FAA346', backgroundColor: '#FEF5EB' };
        else st = { text: statusText[2], color: '#1AAD19', backgroundColor: '#E8F6E8' };
        return (
            <View style={[styles.cardStatus, { backgroundColor: st.backgroundColor }]}>
                <Text style={{ color: st.color, fontSize: 12 }}>{st.text}</Text>
            </View>
        )
    };


    _renderItem = ({ item }) => {
        let type = ['巡检任务', '维保任务'];
        return (
            <TouchableOpacity style={styles.cardItem}
                onPress={() => {
                    this.props.navigation.navigate('TaskDetail', {
                        ITEM_ID: item.ITEM_ID,
                        type: item.TYPE,
                        onComplete: () => {
                            const { qrData } = this.props.navigation.state.params || ''; // 获取参数
                            let params = { 'EQUIPMENT_ID': qrData };
                            this.store.dispatch(Actions.request(this, Urls.Task.getTaskList, params)); // 请求
                        }
                    })
                }}>
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>{item.TASK_NUMBER}</Text>
                    {this._renderCardStatus(item.STATUS, item.TYPE)}
                </View>
                <Text style={styles.cardContent}>{item.EQUIPMENT_NAMES}</Text>
                <Text style={styles.cardContent}>{type[item.TYPE]}</Text>
                <View style={[styles.row, { marginTop: 10 }]}>
                    <Text style={styles.cardPerson}>{item.USER_NAME}</Text>
                    <Text style={styles.cardTime}>{item.VALID_TIME}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _render() {
        if (this.props.requestStatus === Status.SUCCESS) {
            console.log(this.props.tasks)
            if (!Loading.checkData(this.props.tasks)) return;
            if (this.props.tasks.length > 0) {
                return (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.props.tasks}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                )
            } else {
                return (
                    <DefaultPage content={'暂无任务'} />
                )
            }
        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage />
            )
        }
    }
}

//make this component available to the app
function mapStateToProps(state) {
    return {
        tasks: state.Task.getTaskList,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(TaskListScreen);

const styles = Utils.PLStyle({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardItem: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        padding: 10,
        backgroundColor: 'white'
    },
    cardTitle: {
        color: '#333333',
        fontSize: 15,
    },
    cardContent: {
        color: '#979797',
        fontSize: 14,
        marginTop: 10
    },
    cardPerson: {
        color: '#999999',
        fontSize: 12
    },
    cardTime: {
        color: '#999999',
        fontSize: 12
    },
    cardStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 20
    }
})