import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';
import {WrapScreen} from "../wrap";

export default class MaintenanceManagementScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.header = {
            title: "维保管理",
        }
    }

    _onSuccess = (result) => {
        console.log(result);
    }


    _onPressQRCode = () => {
        this.props.navigation.navigate('Qr', {
            onSuccess: this._onSuccess
        });
    }

    _render() {
        return (
            <View>
                <TouchableOpacity onPress={this._onPressQRCode}>
                    <Text>Read QRCode</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
