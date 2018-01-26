import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing
} from 'react-native'
import Camera from 'react-native-camera';
import * as Utils from "../../core/utils";
import _ from 'lodash'
import {WrapScreen} from "../modules/wrap";

export default class QrScan extends WrapScreen {

    constructor(props) {
        super(props);
        this.transMargin = new Animated.Value(0)         // 透明度初始值设为0

    }

    componentDidMount() {
        this._trans()
    }

    _trans = () => {
        this.transMargin.setValue(0);
        Animated.timing(
            this.transMargin,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this._trans())
    };

    _onBarCodeRead = result => {
        if (Utils.isFastExecute()) {
            return;
        }
        let {state} = this.props.navigation;
        if (!_.isNull(result.data)) {
            // 跳转到上一个页面，并携带data
            state.params.onSuccess(result.data);
        }
    };

    render() {
        const trans = this.transMargin.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 240]
        });
        return (
            <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}>
                        <Animated.View style={[
                            styles.line,
                            {
                                marginTop: trans
                            }
                        ]}/>
                    </View>
                    <Text style={styles.tip}>将二维码/条形码放入框中，即可自动扫描</Text>
                </View>
            </Camera>
        );
    }
}

const styles = StyleSheet.create({
    camera: {
        height: Utils.sh,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Utils.sh,
        width: Utils.sw,
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#1AAD19',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    tip: {
        fontSize: 14,
        marginTop: 40,
        color: 'white'
    },
    line: {
        width: 240,
        height: 1,
        backgroundColor: '#1AAD19'
    }
});
