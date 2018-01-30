import React from 'react';
import {
    View,
    Text, FlatList, TouchableOpacity,
} from 'react-native';
import { WrapScreen } from "../wrap";
import * as Utils from "../../../core/utils";
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions'
import Urls from "../../../config/api/urls";
import { Status } from "../../../config/api/api.config";
import { DefaultPage, ErrorPage, ListFilter, Loading, SWFlatList } from "../../components";

class MaintenanceManagementScreen extends WrapScreen {

    _keyExtractor = (item, index) => index;

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false
        }
        this.pullingFlag = ''
    }

    componentDidMount() {
        this._refresh();
    }

    _header = () => {
        return {
            title: "维保任务",
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
    }

    _refresh = () => {
        this.pullingFlag = 'refresh'
        let params = {
            pageIndex: 1,
            pageSize: 10,
        }
        this.store.dispatch(Actions.get(this, Urls.Maintenance.getTaskList, params));
    }


    _pullUp = () => {
        this.pullingFlag = 'pullup'
        this.store.dispatch(Actions.get(this, Urls.Maintenance.getTaskList, this.props.taskListRequest.body));
    }

    _renderCardStatus = (status) => {
        let st = { text: '待维保', color: '#47A9EB', backgroundColor: '#ECF6FD' };
        if (status === 0) st = { text: '待维保', color: '#47A9EB', backgroundColor: '#ECF6FD' };
        else if (status === 1) st = { text: '正在维保', color: '#FAA346', backgroundColor: '#FEF5EB' };
        else st = { text: '维保完成', color: '#1AAD19', backgroundColor: '#E8F6E8' };
        return (
            <View style={[styles.cardStatus, { backgroundColor: st.backgroundColor }]}>
                <Text style={{ color: st.color, fontSize: 12 }}>{st.text}</Text>
            </View>
        )
    };

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardItem}
            onPress={() => {
                this.props.navigation.navigate('MaintenanceDetail', {
                    id: item.ID
                })
            }}>
            <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.TASK_NUMBER}</Text>
                {this._renderCardStatus(item.STATUS)}
            </View>
            <Text style={styles.cardContent}>{item.EQUIPMENT_NAMES}</Text>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={styles.cardPerson}>{item.USER_NAME}</Text>
                <Text style={styles.cardTime}>{item.VALID_TIME}</Text>
            </View>
        </TouchableOpacity>
    );

    _render() {
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(this.props.taskListRequest.list)) return;
            if (this.props.taskListRequest.list.length > 0) {
                return (
                    <View style={{ flex: 1 }}>
                        <SWFlatList
                            refreshing={this.props.taskListRequest.isFetching && this.pullingFlag === 'refresh'}
                            onRefresh={this._refresh}
                            data={this.props.taskListRequest.list}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            pullingUp={this.props.taskListRequest.isFetching && this.pullingFlag === 'pullup'}
                            pullUp={this._pullUp}
                        />
                        {this.state.isFilterShow === true ?
                            <ListFilter
                                containerStyles={{ top: 0 }}
                                filterArray={filterArray}
                                maskerClick={() => {
                                    this.setState({
                                        isFilterShow: false,
                                    })
                                }}
                            /> : <View />}
                    </View>
                )
            } else {
                return (
                    <DefaultPage content={'暂无维保任务'} />
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
        taskListRequest: state.Maintenance.taskListRequest,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(MaintenanceManagementScreen);

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
    }
];
