import React from 'react';
import {
    Image,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import _ from 'lodash'
import * as Utils from "../../../core/utils";
import { WrapScreen } from "../wrap";
import { homeModules } from '../../../config/nav/home.route'
import { Divider } from "react-native-elements";
import * as Assets from '../../assets'
import { Carousel } from "teaset";
import PercentageCircle from 'react-native-percentage-circle';
const circleColor = [['#CAE387', '#FFDC00', '#999EF7', '#0281FF'], ['#FF5646', '#FF7E00', '#8BC7FF', '#76DDAC']];

class WorkScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.header = 'none';
        this.state = {
            currentIndex: 0,
            parameters: [
                { type: 'COD', size: '52', symbol: 'mg/l' },
                { type: '氨氮', size: '71', symbol: 'mg/l' },
                { type: '总氮', size: '52', symbol: 'mg/l' },
                { type: '总磷', size: '52', symbol: 'mg/l' },
                { type: 'SS', size: '51', symbol: 'mg/l' },
                { type: 'PH', size: '54', symbol: '' },
                { type: '温度', size: '52', symbol: '°C' },
                { type: '流量', size: '55', symbol: 'mg/l' }
            ]
        };
    }

    _header = () => 'none';

    _onQrSuccess = (result) => {
        // 进入维保页面
        this.props.navigation.navigate('TaskList', {
            qrData: '11E80005DBC9EC4D943D230B848AE364'
            // qrData: result
        })
    };

    _renderDot = (index, children) => {
        return (
            <View style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1
            }}>
                {index === 1 ? children.reverse() : children}
            </View>
        )
    }

    _renderCard = (parameters) => (
        <View style={styles.cardContainer}>
            <Carousel
                carousel={false}
                style={styles.swipeContent}
            >
                {
                    parameters.map((item, i) => (
                        <View style={styles.paramsContainerStyle} key={'CarouselContainer' + i}>
                            <View style={styles.paramsStyle}>
                                {item.map((sim, j) => (
                                    <View style={styles.paramsItem} key={'CarouselContent' + j}>
                                        <PercentageCircle radius={33} percent={parseInt(sim.size)}
                                            color={circleColor[i][j]}
                                            bgcolor={'#EBEBEB'}
                                            borderWidth={7}>
                                            <Text style={styles.paramsSizeText}>{sim.size}</Text>
                                            {sim.symbol !== '' &&
                                                <Text style={styles.paramsSymbolText}>{sim.symbol}</Text>}
                                        </PercentageCircle>
                                        <Text style={{
                                            color: '#333',
                                            fontSize: 13,
                                            marginTop: 10
                                        }}>{sim.type}</Text>
                                    </View>
                                ))}
                            </View>
                            {this._renderDot(i, [
                                <View style={[styles.dot, {
                                    backgroundColor: '#42BB55'
                                }]} />,
                                <View style={styles.dot} />
                            ])}
                        </View>
                    )
                    )
                }
            </Carousel>
        </View>
    );

    _render() {
        const modules = _.chunk(homeModules, 3); // 将HomeModule 每三个分成一个数组
        const parameters = _.chunk(this.state.parameters, 4); // 将HomeModule 每三个分成一个数组
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image source={Assets.Home.bg} style={styles.bg} />
                    <View style={styles.headContainer}>
                        <View style={styles.optTitle}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image source={Assets.Home.location} />
                                <Text style={styles.optText}>宁乡县污水处理厂</Text>
                                <Image source={Assets.Home.arrowDown} />
                            </View>
                            <TouchableOpacity onPress={() =>
                                //  this.props.navigation.navigate('Qr', {
                                //       onSuccess: this._onQrSuccess
                                //   })
                                this._onQrSuccess()
                            }>
                                <Image source={Assets.Home.scan} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingLeft: 15, marginTop: 20 }}>
                            <Text style={{ color: 'white', fontSize: 22 }}>正常</Text>
                            <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}>运行状态</Text>
                        </View>
                        {this._renderCard(parameters)}
                        <View style={styles.safeContainer}>
                            <Image source={Assets.Home.circle} style={styles.circle} />
                            <View style={styles.safeContent}>
                                <Image source={Assets.Home.circleSafe} />
                                <Text style={styles.safeText}>水质监测</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.configContainer}>
                        <View style={styles.configTitle}>
                            <View style={{
                                width: 3,
                                height: 16,
                                backgroundColor: '#42BB55'
                            }} />
                            <Text style={{
                                fontSize: 14,
                                color: '#666',
                                marginLeft: 5
                            }}>常用工具</Text>
                        </View>
                        <Divider style={{ backgroundColor: '#E5E5E5' }} />
                        {modules.map((item, index) => {
                            return (
                                <View style={{ flex: 1, }} key={index}>
                                    <View style={styles.configItemRow}>
                                        {
                                            item.map((module, i) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.configItem} key={i}
                                                        onPress={() => this.props.navigation.navigate(module.router)}>
                                                        <Image source={module.img} />
                                                        <Text style={styles.configText}>{module.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                    <Divider style={{ backgroundColor: '#E5E5E5' }} />
                                </View>
                            )
                        })}
                    </View>
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
    bg: {
        width: Utils.sw,
        height: Utils.sw,
    },
    headContainer: {
        android: {
            flex: 1.8,
        },
        ios: {
            flex: 1.6
        },
        marginTop: -Utils.sw,
        backgroundColor: 'transparent'
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
        backgroundColor: 'white',
        android: {
            marginTop: 44,
        },
        ios: {
            marginTop: 50,
        },
        height: Utils.sh * 0.26,
        borderColor: '#DCE8C8',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'column',
        padding: 2
    },
    safeContainer: {
        position: 'absolute',
        left: (Utils.sw - 80) / 2,
        android: {
            marginTop: 200
        },
        ios: {
            marginTop: 190
        }
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
        flex: 1,
    },
    dot: {
        backgroundColor: '#D8D8D8',
        width: 20,
        height: 2,
        marginLeft: 2,
        marginRight: 2
    },
    paramsContainerStyle: {
        flex: 1
    },
    paramsStyle: {
        flexDirection: 'row',
        marginTop: 40
    },
    paramsItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6
    },
    paramsSizeText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#333',
        fontSize: 20
    },
    paramsSymbolText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#999',
        fontSize: 10
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