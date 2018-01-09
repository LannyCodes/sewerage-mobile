import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export default class MaintenanceManagementScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
            title: "维保管理",
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
