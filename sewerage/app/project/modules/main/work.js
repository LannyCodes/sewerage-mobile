import React from 'react';
import {
    Text, TouchableOpacity,
    View,
} from 'react-native';
import _ from 'lodash'
import * as Utils from "../../../core/utils";
import {WrapScreen} from "../wrap";
import {homeModules} from '../../../config/nav/home.route'
import {Button, Icon} from "react-native-elements";
import QrScan from "../../components/qrScan";

class WorkScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.header= 'none'
        this.state = {
            currentIndex: 0,
        }
    }

    _onQrSuccess = (result) => {
        // 进入维保页面
        this.props.navigation.navigate('MaintenanceTask', {
            qrData: result
        })
    };

    _render() {
        const modules = _.chunk(homeModules, 3); // 将HomeModule 每三个分成一个数组
        return (
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <Icon
                        name='md-qr-scanner'
                        type='ionicon'
                        color='#517fa4'
                        onPress={() => this.props.navigation.navigate('Qr', {
                            onSuccess: this._onQrSuccess
                        })}
                    />
                </View>
                <View style={styles.configContainer}>
                    {modules.map((item, index) => {
                        return (
                            <View style={styles.configItemRow} key={index}>
                                {
                                    item.map((module, i) => {
                                        return (
                                            <TouchableOpacity
                                                style={[styles.configItem, {backgroundColor: module.color}]} key={i}
                                                onPress={() => this.props.navigation.navigate(module.router)}>
                                                <Text style={styles.configText}>{module.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }
}

export default WorkScreen
const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    headContainer: {
        flex: 1.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    configContainer: {
        flex: 1,
    },
    webView: {
        flex: 1
    },
    configItemRow: {
        flex: 1,
        flexDirection: 'row'
    },
    configItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    columnLine: {
        width: 1,
        backgroundColor: '#cccccc',
        opacity: 0.5
    },
    configText: {
        marginTop: 10,
        color: '#fff'
    }
});