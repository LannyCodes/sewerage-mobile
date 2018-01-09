import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export default class DataStatisticsScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
            title: "数据统计",
        }
    }

    _render() {
        return (
            <View>
                <Text>Me</Text>
            </View>
        )
    }
}
