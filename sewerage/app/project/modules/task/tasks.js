import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Actions from '../../redux/actions'
import Urls from "../../../config/api/urls";
import * as Utils from "../../../core/utils";
import {Status} from "../../../config/api/api.config";
import {DefaultPage, ErrorPage, Loading} from "../../components";

class TaskListScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {qrData} = this.props.navigation.state.params || ''; // 获取参数
        this.store.dispatch(Actions.request(this,Urls.Task.getTaskList, {params: qrData})); // 请求
    }

    _header=()=>{
        return {
            title: "任务选择",
        }
    }

    _keyExtractor = (item, index) => index;

    _renderCardStatus = (status) => {
        let st = {text: '待执行', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        if (status === '0') st = {text: '待执行', color: '#47A9EB', backgroundColor: '#ECF6FD'};
        else if (status === '1') st = {text: '执行中', color: '#FAA346', backgroundColor: '#FEF5EB'};
        else st = {text: '已完成', color: '#1AAD19', backgroundColor: '#E8F6E8'};
        return (
            <View style={[styles.cardStatus, {backgroundColor: st.backgroundColor}]}>
                <Text style={{color: st.color}}>{st.text}</Text>
            </View>
        )
    };

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.cardItem}
                          onPress={() => {
                              this.props.navigation.navigate('TaskMaintenanceDetail')
                          }}
        >
            <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {this._renderCardStatus(item.status)}
            </View>
            <Text style={styles.cardContent}>{item.content}</Text>
            <View style={[styles.row, {marginTop: 10}]}>
                <Text style={styles.cardPerson}>{item.person}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    _render() {
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(this.props.tasks)) return;
            if (this.props.tasks.length > 0) {
                return (
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.props.tasks}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                )
            } else {
                return (
                    <DefaultPage content={'暂无审核任务'}/>
                )
            }
        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage/>
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
        width: 60,
        borderRadius: 20
    }
})