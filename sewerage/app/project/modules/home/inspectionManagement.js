import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

export class InspectionManagementScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
            title: "巡检管理",
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
