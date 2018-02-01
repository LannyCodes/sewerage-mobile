import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Utils from "../../core/utils";
import PropTypes from 'prop-types'
import { WrapScreen } from '../modules/wrap';
import { Divider } from 'react-native-elements'

// create a component
export default class ChooseStation extends WrapScreen {
    _header = () => ({ title: "选择场站" })

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ paddingTop: 12, paddingLeft: 10, paddingBottom: 12, backgroundColor: 'white' }}
                onPress={() => {
                    this.props.navigation.state.params.onChooseStation(item);
                    this.props.navigation.goBack();
                }}
            >
                <Text style={{ color: '#333', fontSize: 16 }}>{item.NAME}</Text>
                <Text style={{ color: '#666', fontSize: 12, marginTop: 3 }}>{item.ADDRESS}</Text>
            </TouchableOpacity>
        )
    }

    _render() {
        let { stations, currentStation } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                {
                    currentStation &&
                    <View>
                        <TouchableOpacity style={{ paddingTop: 12, paddingLeft: 10, paddingBottom: 12, backgroundColor: 'white' }}
                            onPress={() => {
                                this.props.navigation.state.params.onChooseStation(null);
                                this.props.navigation.goBack();
                            }}
                        >
                            <Text style={{ color: '#333', fontSize: 16 }}>请选择</Text>
                            <Text style={{ color: '#666', fontSize: 12, marginTop: 3 }}>点击这里查看场站信息</Text>
                        </TouchableOpacity>
                        <View style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                            <Text style={{ color: '#666', fontSize: 14 }}>当前场站</Text>
                        </View>
                        <View style={{ paddingTop: 12, paddingLeft: 10, paddingBottom: 12, backgroundColor: 'white' }}>
                            <Text style={{ color: '#333', fontSize: 16 }}>{currentStation.NAME}</Text>
                            <Text style={{ color: '#666', fontSize: 12, marginTop: 3 }}>{currentStation.ADDRESS}</Text>
                        </View>
                    </View>
                }
                <View style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                    <Text style={{ color: '#666', fontSize: 14 }}>所有场站</Text>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={stations}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={() => (
                        <Divider style={{ backgroundColor: '#ddd' }} />
                    )}
                />
            </View>
        );
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    }
});
