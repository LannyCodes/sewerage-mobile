import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { WrapScreen } from "../wrap";
import { SWFlatList } from '../../components';

class MessageScreen extends WrapScreen {
    constructor(props) {
        super(props);
    }

    _header = () => {
        return {
            title: '消息',
            left: {
                none: true,
            }
        }
    }

    _onBarCodeRead = (e) => {
        console.log("Barcode Found!",
            "Type: " + e.type + "\nData: " + e.data)
    }

    _keyExtractor = (item, index) => index

    _itemClick = (item, index) => {
        console.log('itemClick')
    }

    _renderItem = (item, index) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={1}
                onPress={this._itemClick}>
                <View style={{ borderWidth: 1, borderColor: 'transparent', borderRadius: 8, backgroundColor: "#42BB55", width: 40, height: 40 }} />
                <View style={styles.itemMsg}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.itemTitleText}>巡检任务通知</Text>
                        <Text style={[styles.itemTitleText, { fontSize: 12 }]}>2017-09-30</Text>
                    </View>
                    <Text
                        style={styles.itemContent}
                        numberOfLines={1}>
                        固废处理事业部工作任务管理系统正式启用
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _render() {
        return (
            <SWFlatList
                data={['q', 'w', 'c']}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={<View style={{ height: 10, backgroundColor: '#f1f1f1' }} />}
                ItemSeparatorComponent={() => {
                    return <View style={{ backgroundColor: '#e5e5e5', height: 0.5, flex: 1, marginLeft: 20 }} />
                }}
            />
        )
    }
}

export default MessageScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    itemContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 17,
        paddingBottom: 16,
        backgroundColor: '#ffffff',
    },
    itemMsg: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 9,
    },
    itemTitleText: {
        color: '#666666',
        fontSize: 14,
    },
    itemContent: {
        color: '#333333',
        fontSize: 14,
    }
})