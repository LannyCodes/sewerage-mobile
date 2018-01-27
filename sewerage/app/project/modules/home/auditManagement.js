import React, { Component } from 'react';
import {
    View,
    Text, TouchableOpacity, FlatList,
} from 'react-native';
import { WrapScreen } from "../wrap";
import * as Utils from "../../../core/utils";
import * as Actions from "../../redux/actions";
import { connect } from "react-redux";
import Urls from "../../../config/api/urls";
import { DefaultPage, ErrorPage, ListFilter, Loading } from "../../components";
import { Status } from "../../../config/api/api.config";
import { ScrollableTabBar } from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const processTypeObj = {
    inspection_plan_process: '巡检计划',
    maintenance_plan_process: '维保计划',
    breakdown_bill_process: '故障工单',
    product_store_process: '库存变更'
}
class AuditManagementScreen extends WrapScreen {

    _keyExtractor = (item, index) => index;

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false
        }
        this.pullingFlag = ''
    }

    componentDidMount() {
        this._waitListRefresh()
        this._doneListRefresh()
    }


    _waitListRefresh = () => {
        this.pullingFlag = 'waitRefresh'
        let params = {
            pageIndex: 1,
            pageSize: 10,
        }
        this.store.dispatch(Actions.get(this, Urls.Audit.getWaitAuditList, params));
    }

    _doneListRefresh = () => {
        this.pullingFlag = 'doneRefresh'
        let params = {
            pageIndex: 1,
            pageSize: 10,
        }
        this.store.dispatch(Actions.get(this, Urls.Audit.getDoneAuditList, params));
    }

    _header = () => {
        return {
            title: "审核管理",
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

    _enterDetail = (type, id, status) => {
        this.props.navigation.navigate('AuditDetail', {
            processId: id,
            processType: type
        });
    };

    _renderCardStatus = (status) => {
        let st = { text: '待审核', color: '#FAA346', backgroundColor: '#FEF5EB' };
        if (status === 0) st = { text: '待审核', color: '#FAA346', backgroundColor: '#FEF5EB' };
        else if (status === 1) st = { text: '已驳回', color: '#47A9EB', backgroundColor: '#ECF6FD' };
        else if (status === 2) st = { text: '已废弃', color: '#FF6E61', backgroundColor: '#FFE2DF' };
        else if (status === 3) st = { text: '已通过', color: '#1AAD19', backgroundColor: '#E8F6E8' };
        return (
            <View style={[styles.cardStatus, { backgroundColor: st.backgroundColor }]}>
                <Text style={{ color: st.color, fontSize: 12 }}>{st.text}</Text>
            </View>
        )
    };

    _getAuditProcessType = (processType) => {

    }

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardItem}
            onPress={() => {
                this._enterDetail(item.PROCESS_TYPE, item.ID, item.STATUS);
            }}
        >
            <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.THEME}</Text>
                {this._renderCardStatus(item.STATUS)}
            </View>
            <Text style={[styles.cardPerson, { marginTop: 5 }]}>{processTypeObj[item.PROCESS_TYPE]}审核</Text>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={styles.cardPerson}>{item.CREATE_USER}</Text>
                <Text style={styles.cardTime}>{item.CREATE_TIME}</Text>
            </View>
        </TouchableOpacity>
    );

    _render() {
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(this.props.waitAuditListRequest.list)) return;
            return (
                <View style={{ flex: 1 }}>
                    <ScrollableTabView
                        locked={true}
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
                        {/* 待审核 */}
                        <FlatList
                            tabLabel='待审核'
                            data={this.props.waitAuditListRequest.list}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        {/* 已审核 */}
                        <FlatList
                            tabLabel='已审核'
                            data={this.props.doneAuditListRequest.list}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </ScrollableTabView>
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

        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage />
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        waitAuditListRequest: state.Audit.waitAuditListRequest,
        doneAuditListRequest: state.Audit.doneAuditListRequest,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(AuditManagementScreen);

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
        title: '状态',
        keyName: 'ssb',
        multipleChoice: false,
        data: [{
            name: '待审核',
            value: '11',
        }, {
            name: '已通过',
            value: '22',
        }, {
            name: '已驳回',
            value: '33',
        }, {
            name: '已废弃',
            value: '44',
        }]
    },
    {
        title: '类型',
        keyName: 'aab',
        multipleChoice: false,
        data: [{
            name: '巡检计划审核',
            value: '11',
        }, {
            name: '维保计划审核',
            value: '22',
        }, {
            name: '故障工单审核',
            value: '33',
        }, {
            name: '变更单审核',
            value: '44',
        }]
    }
];
