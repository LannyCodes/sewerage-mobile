import React from 'react';
import {
    Image,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import _ from 'lodash'
import * as Utils from "../../../core/utils";
import {WrapScreen} from "../wrap";
import {homeModules} from '../../../config/nav/home.route'
import {Divider} from "react-native-elements";
import * as Assets from '../../assets'

class WorkScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.header = 'none';
        this.state = {
            currentIndex: 0,
        }
    }

    _onQrSuccess = (result) => {
        // 进入维保页面
        this.props.navigation.navigate('TaskList', {
            qrData: result
        })
    };

    _render() {
        const modules = _.chunk(homeModules, 3); // 将HomeModule 每三个分成一个数组
        return (
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.optTitle}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Image source={Assets.Home.location}/>
                            <Text style={styles.optText}>宁乡县污水处理厂</Text>
                            <Image source={Assets.Home.arrowDown}/>
                        </View>
                        <Image source={Assets.Home.scan} style={styles.icon}/>
                    </View>
                    <View style={{paddingLeft: 15, marginTop: 20}}>
                        <Text style={{color: 'white', fontSize: 22}}>正常</Text>
                        <Text style={{color: 'white', fontSize: 12, marginTop: 10}}>运行状态</Text>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={[styles.center, {flexDirection: 'column'}]}>
                            <Image source={Assets.Home.circle} style={styles.circle}/>
                            <View style={styles.safeContent}>
                                <Image source={Assets.Home.circleSafe}/>
                                <Text style={styles.safeText}>水质监测</Text>
                            </View>
                        </View>
                        <View style={styles.swipeContent}>
                        </View>
                    </View>
                </View>
                <View style={styles.configContainer}>
                    <View style={styles.configTitle}>
                        <View style={{
                            width: 3,
                            height: 16,
                            backgroundColor: '#42BB55'
                        }}/>
                        <Text style={{
                            fontSize: 14,
                            color: '#666',
                            marginLeft: 5
                        }}>常用工具</Text>
                    </View>
                    <Divider style={{backgroundColor: '#E5E5E5'}}/>
                    {modules.map((item, index) => {
                        return (
                            <View style={{flex: 1,}}>
                                <View style={styles.configItemRow} key={index}>
                                    {
                                        item.map((module, i) => {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.configItem} key={i}
                                                    onPress={() => this.props.navigation.navigate(module.router)}>
                                                    <Image source={module.img}/>
                                                    <Text style={styles.configText}>{module.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                                <Divider style={{backgroundColor: '#E5E5E5'}}/>
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
        backgroundColor: '#F9FBFD'
    },
    headContainer: {
        flex: 1.5,
        backgroundColor: '#42BD56'
    },
    optTitle: {
        marginTop: 50,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
        marginRight: 5
    },
    row: {
        flexDirection: 'row'
    },
    icon: {
        width: 18,
        height: 18
    },
    cardContainer: {
        marginLeft: 15,
        marginRight: 15,
        height: 140,
        backgroundColor: 'white',
        marginTop: 50,
        borderColor: '#DCE8C8',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'column',
        padding: 2
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 80,
        height: 80,
        marginTop: -40,
        borderRadius: 40,
        backgroundColor: 'white',
    },
    safeContent: {
        alignItems: 'center',
        marginTop: -60
    },
    safeText: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: 5
    },
    swipeContent: {
        backgroundColor: 'red',
        flex: 1,
        marginTop: 24
    },
    configContainer: {
        flex: 1,
        margin: 15,
        borderColor: '#DCE8C8',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    configTitle: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15
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
    },
    columnLine: {
        width: 1,
        backgroundColor: '#cccccc',
        opacity: 0.5
    },
    configText: {
        marginTop: 10,
        color: '#333333',
        fontSize: 12
    }
});