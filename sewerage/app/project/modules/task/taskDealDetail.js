import React from 'react';

import { WrapScreen } from "../wrap";
import * as Utils from "../../../core/utils";
import { FlatList, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import _ from 'lodash'
import { PictureOverlay } from '../../components/PictureOverlay'
import { config } from '../../../config/setting'
export default class TaskDealDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.state = {
            clickImageUri: '',
        }
    }

    _header = () => {
        return {
            title: '故障处理详情',
        }
    };
    _keyExtractor = (item, index) => index;

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{
                width: Utils.sw / 4,
                height: Utils.sw / 4,
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => {
                this.oc.showModal();
                this.setState({
                    clickImageUri: item
                })
            }}>
                <Image
                    source={{ uri: item }}
                    style={{
                        width: Utils.sw / 4 - 5,
                        height: Utils.sw / 4 - 5,
                    }}
                />
            </TouchableOpacity>
        )
    }
    _getImages = (images) => {
        let imgs = images.map((item, i) => {
            return config.ImageServer + item.FILE_PATH;
        })
        return imgs
    }

    _render() {
        let { CONTENT, STATUS, BREAKDOWN } = this.props.navigation.state.params.data;
        let status = ['未巡检', '异常', '正常', '未确定'];
        let rank = ['I级', 'II级', 'III级'];
        let type = ['机械故障', '控制故障', '电气故障'];
        let handleStatus = ['待处理', '工单正在处理', '现场解决', '工单处理完成'];
        let breakDownSource = ['巡检', '维保', '其他'];
        let images = BREAKDOWN.ATTACHMENT_IDS ? this._getImages(BREAKDOWN.ATTACHMENT_IDS) : null;
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.text}>{CONTENT}</Text>
                    </View>
                    <Divider style={{ backgroundColor: '#ddd' }} />
                    <View style={styles.rowBetween}>
                        <Text
                            style={[styles.text, { color: '#666' }]}>{breakDownSource[BREAKDOWN.BREAKDOWN_SOURCE]}内容状态</Text>
                        <Text style={styles.text}>{status[STATUS]}</Text>
                    </View>
                    <Divider style={{ backgroundColor: '#ddd' }} />
                    {BREAKDOWN.BREAKDOWN_DESCRIB && <View style={styles.columnBetween}>
                        <Text style={[styles.text, { color: '#666' }]}>故障描述</Text>
                        <Text style={[styles.text, { marginTop: 10 }]}>{BREAKDOWN.BREAKDOWN_DESCRIBE}</Text>
                    </View>}
                    {BREAKDOWN.BREAKDOWN_DESCRIB && <DividPer style={{ backgroundColor: '#ddd' }} />}
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, { color: '#666' }]}>故障来源</Text>
                        <Text style={styles.text}>{breakDownSource[BREAKDOWN.BREAKDOWN_SOURCE]}</Text>
                    </View>
                    <Divider style={{ backgroundColor: '#ddd' }} />
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, { color: '#666' }]}>故障类型</Text>
                        <Text style={styles.text}>{type[BREAKDOWN.TYPE]}</Text>
                    </View>
                    <Divider style={{ backgroundColor: '#ddd' }} />
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, { color: '#666' }]}>故障等级</Text>
                        <Text style={styles.text}>{rank[BREAKDOWN.RANK]}</Text>
                    </View>
                    <Divider style={{ backgroundColor: '#ddd' }} />
                    <View style={styles.rowBetween}>
                        <Text style={[styles.text, { color: '#666' }]}>处理状态</Text>
                        <Text style={styles.text}>{handleStatus[BREAKDOWN.STATUS]}</Text>
                    </View>
                    <Divider style={{ backgroundColor: '#ddd' }} />
                    {BREAKDOWN.HANDLE_WAY && <View style={styles.columnBetween}>
                        <Text style={[styles.text, { color: '#666' }]}>处理方式</Text>
                        <Text style={[styles.text, { marginTop: 10 }]}>{BREAKDOWN.HANDLE_WAY}</Text>
                    </View>
                    }
                    {BREAKDOWN.HANDLE_WAY && <Divider style={{ backgroundColor: '#ddd' }} />}
                    {BREAKDOWN.ATTACHMENT_IDS && <FlatList
                        ListHeaderComponent={
                            <View style={styles.columnBetween}>
                                <Text style={[styles.text, { color: '#666' }]}>故障图片</Text>
                            </View>
                        }
                        style={{ marginBottom: 10 }}
                        numColumns={4}
                        keyExtractor={this._keyExtractor}
                        data={images}
                        renderItem={this._renderItem}
                    />}
                </View>
                <PictureOverlay
                    ref={(oc) => {
                        this.oc = oc
                    }}
                    cache={true} //如果是本地图片，必须设置为false
                    url={this.state.clickImageUri} />
            </ScrollView>
        )
    }
}


const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    text: {
        color: '#333333',
        fontSize: 15
    },
    rowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 44,
        paddingLeft: 10,
        paddingRight: 10
    },
    columnBetween: {
        padding: 10
    }
});
