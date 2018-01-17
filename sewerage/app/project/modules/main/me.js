import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';
import {WrapScreen} from "../wrap";
import * as Utils from "../../../core/utils/common";
import Urls from "../../../config/api/urls";

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
                    // Utils.exitApp(this);
                    let params = {'pageIndex': 1, 'pageSize': 10};
                    Utils.fetch(self, Urls.Login.inspection, params, 'get').then(data => {
                        console.log(data);
                    });
                }}>
                    <Text>退出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MeScreen