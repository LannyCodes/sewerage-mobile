import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {USER_KEY} from "../../../config/setting";
import * as Utils from "../../../core/utils/common";

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
                <TouchableOpacity onPress={() => {
                    storage.remove({
                        key: USER_KEY
                    });
                    _USERTOKEN_ = '';
                    Utils.resetNavigation(this.props.navigation, 'Login')
                }}>
                    <Text>退出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MeScreen