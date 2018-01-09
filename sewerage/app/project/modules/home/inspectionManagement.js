import React from 'react';
import {
    View,
    Text, FlatList,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {GetInspectionTaskList} from "../../api";
import * as Utils from "../../../core/utils";

export class InspectionManagementScreen extends WrapScreen {

    static defaultProps = {
        header: {
            title: "巡检任务",
        }
    }

    _keyExtractor = (item, index) => item.id;

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        let me = this;
        new GetInspectionTaskList().start(function (succ) {
            me.setState({
                list: succ
            })
        })
    }

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
        <View style={styles.cardItem}>
            <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {this._renderCardStatus(item.status)}
            </View>
            <Text style={styles.cardContent}>{item.content}</Text>
            <View style={[styles.row, {marginTop: 10}]}>
                <Text style={styles.cardPerson}>{item.person}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
            </View>
        </View>
    );

    _render() {
        if (this.state.list.length > 0) {
            return (
                <FlatList
                    data={this.state.list}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            )
        }
    }
}

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
