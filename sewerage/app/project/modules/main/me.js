import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {WrapScreen} from "../wrap";

class MeScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "我的",
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

export default MeScreen