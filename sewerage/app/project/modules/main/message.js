import React from 'react';
import {
    View,
    Text,
    StyleSheet
    // Button,
} from 'react-native';
import { WrapScreen } from "../wrap";
import * as Assert from '../../assets';
import Camera from 'react-native-camera';

export class MessageScreen extends WrapScreen {
    constructor(props) {
        super(props);
    }

    _onBarCodeRead = (e) => {
        console.log("Barcode Found!",
            "Type: " + e.type + "\nData: " + e.data)
    }

    _render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.camera}
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    onBarCodeRead={this._onBarCodeRead.bind(this)}></Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
      },
    camera: {
        flex:1,
        backgroundColor:'red',
    }
})