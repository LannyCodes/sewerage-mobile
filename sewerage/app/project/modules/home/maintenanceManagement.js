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
import { DefaultPage, ErrorPage, ListFilter, Loading } from "../../components";

class MaintenanceManagementScreen extends WrapScreen {

    _keyExtractor = (item, index) => index;

    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false
        }
    }

    componentDidMount() {
        this.store.dispatch(Actions.request(this, Urls.Maintenance.getMaintenanceList));
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

    _renderCardStatus = (status) => {
        let st = { text: '待执行', color: '#47A9EB', backgroundColor: '#ECF6FD' };
        if (status === '0') st = { text: '待执行', color: '#47A9EB', backgroundColor: '#ECF6FD' };
        else if (status === '1') st = { text: '执行中', color: '#FAA346', backgroundColor: '#FEF5EB' };
        else st = { text: '已完成', color: '#1AAD19', backgroundColor: '#E8F6E8' };
        return (
            <View style={[styles.cardStatus, { backgroundColor: st.backgroundColor }]}>
                <Text style={{ color: st.color }}>{st.text}</Text>
            </View>
        )
    };

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardItem}
            onPress={() => {
                this.props.navigation.navigate()
            }}
        >
            <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {this._renderCardStatus(item.status)}
            </View>
            <Text style={styles.cardContent}>{item.content}</Text>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={styles.cardPerson}>{item.person}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    _render() {
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(this.props.maintenanceList)) return;
            if (this.props.maintenanceList.length > 0) {
                return (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.props.maintenanceList}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
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
                    <DefaultPage content={'暂无维保数据'} />
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
        maintenanceList: state.Maintenance.getMaintenanceList,
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
        width: 60,
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
        }, {
            name: '规格三',
            value: '33',
        }]
    }
];
