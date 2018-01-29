import React, { Component } from 'react';
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import { Status } from "../../../config/api/api.config";
import { ErrorPage, Loading } from "../../components";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import { renderCardStatus, renderOperate,renderCheckLogs } from './auditComponents'
export default class AuditWBDetailComponent extends Component {

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item }) => (
        <View style={{ padding: 13 }}>
            <Text style={[styles.text, { marginLeft: 5 }]}>{item.EQUIPMENT_NAME}</Text>
            {item.ITEM_CONTENTS.map((item, i) => {
                return (
                    <Text key={'item' + i} style={{ fontSize: 14, color: '#999', marginLeft: 7, marginTop: 4 }}>{item.NAME}</Text>
                )
            })}
        </View>
    );

    render() {
        const detail = this.props.auditDetail;
        console.log(detail)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.detail}>
                        <View style={styles.tag1}>
                            <View style={styles.tag1}>
                                <Avatar
                                    medium
                                    rounded
                                    source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
                                    activeOpacity={0.7}
                                />
                                <View
                                    style={{ justifyContent: 'space-around', alignItems: 'center', marginLeft: 20 }}>
                                    <Text style={[styles.text, { fontSize: 16 }]}>{detail.NAME}</Text>
                                </View>
                            </View>
                            {renderCardStatus(detail.STATUS)}
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>计划周期（天）</Text>
                            <Text style={styles.text}>{detail.CYCLE}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>执行周期（天）</Text>
                            <Text style={styles.text}>{detail.EFFECTIVE_TIME}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>运营公司</Text>
                            <Text style={styles.text}>{detail.COMPANY_NAME}</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <View style={styles.rowBetween}>
                            <Text style={[styles.text, { color: '#666' }]}>维保人</Text>
                            <Text style={styles.text}>{detail.EXECUTE_USER_NAME}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.contentTitle}>
                            <Text>维保内容</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#ddd' }} />
                        <FlatList
                            data={detail.ITEMS}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            ItemSeparatorComponent={() => (
                                <Divider style={{ backgroundColor: '#ddd' }} />
                            )}
                        />
                    </View>
                    {detail.STATUS !== 0 && renderCheckLogs(detail.CHECK_LOGS)}
                </ScrollView>
                {detail.STATUS === 0 && renderOperate(this)}
            </View>
        )
    }
}



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
        backgroundColor: '#FEF5EB',
        width: 45,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    tipText: {
        color: '#FAA346',
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
    }
});
