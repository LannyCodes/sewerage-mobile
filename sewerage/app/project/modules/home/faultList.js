import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class FaultListScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
            title: "故障工单",
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
