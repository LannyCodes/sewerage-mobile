import React from 'react';
import { WrapScreen } from "../wrap";
import { connect } from "react-redux";
import * as Utils from "../../../core/utils";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { GridImagePicker } from "../../components";
import Urls from "../../../config/api/urls";

let imageIds0 = [];
let imageIds1 = [];

class TaskUploadScreen extends WrapScreen {
    constructor(props) {
        super(props);
        this.taskUploadFun = ['inspectiontaskDeal', 'maintenancetaskDeal'];

        this.state = {
            selectedIndex: 0,
            typeIndex0: 0, // 问题类型
            typeIndex1: 0,
            rankIndex0: 0, // 问题等级
            rankIndex1: 0,
            faultDes0: '', // 故障描述输入
            faultDes1: '',
            s1Text: '', // 问题反馈输入
            s2Text: '',
            s3Text: '',
            uploadImages0: [], // 问题图片
            uploadImages1: [],
            dealText0: '', // 处理输入
            dealText1: ''
        }
        this.type = this.props.navigation.state.params.type;
    }

    _header = () => {
        const { state, goBack } = this.props.navigation;
        let type = state.params.type;
        return {
            title: ['巡检内容', '维保内容'][type],
            right: {
                icon: 'save',
                type: 'feather',
                onPress: () => {
                    let params = null;
                    if (this.state.selectedIndex === 0) {
                        //正常
                        params = {
                            'DESCRIBE': this.state.s1Text,
                            'HANDLE_TYPE': 0,
                        }
                    } else if (this.state.selectedIndex === 1) {
                        params = {
                            'DESCRIBE': this.state.s2Text,
                            'BREAKDOWN_DESCRIBE': this.state.faultDes0,
                            'HANDLE_TYPE': 1, // 故障能处理
                            'TYPE': this.state.typeIndex0,
                            'RANK': this.state.rankIndex0,
                            'HANDLE_WAY': this.state.dealText0,
                            'ATTACHMENT_IDS': imageIds0.join(",")
                        }
                    } else if (this.state.selectedIndex === 2) {
                        params = {
                            'DESCRIBE': this.state.s3Text,
                            'BREAKDOWN_DESCRIBE': this.state.faultDes1,
                            'HANDLE_TYPE': 2, // 故障能处理
                            'TYPE': this.state.typeIndex1,
                            'RANK': this.state.rankIndex1,
                            'HANDLE_WAY': this.state.dealText1,
                            'ATTACHMENT_IDS': imageIds1.join(",")
                        }
                    }
                    Object.assign(params, state.params.itemParams);
                    console.log(params);
                    Utils.fetch(this, Urls.Task[this.taskUploadFun[type]], params).then((data) => {
                        imageIds0 = [];
                        imageIds1 = [];
                        state.params.onComplete();
                        goBack();
                    });
                }
            }
        }
    };

    _getSelectedStyle = (index) => {
        let style;
        if (this.state.selectedIndex === index) {
            style = {
                container: {
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'rgba(66,187,85,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                icon: {
                    name: 'check-circle-outline',
                    color: '#42BB55',
                },
                text: {
                    color: '#42BB55',
                    fontSize: 14,
                    marginLeft: 3
                }
            }
        } else {
            style = {
                container: {
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                icon: {
                    name: 'checkbox-blank-circle-outline',
                    color: '#D8D8D8'
                },
                text: {
                    color: '#404040',
                    fontSize: 14,
                    marginLeft: 3,
                }
            }
        }
        return style;
    };

    _getBtnRadioStyle = (index, status, type) => {
        let style;
        let typeIndex = ['typeIndex0', 'typeIndex1'];
        let rankIndex = ['rankIndex0', 'rankIndex1'];
        let i = type === 'type' ? this.state[typeIndex[status]] : this.state[rankIndex[status]];
        if (i === index) {
            style = {
                container: {
                    flex: 1,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: 'row',
                    backgroundColor: 'rgba(66,187,85,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                text: {
                    color: '#42BB55',
                    fontSize: 14,
                }
            }
        } else {
            style = {
                container: {
                    marginLeft: 10,
                    marginRight: 10,
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#cccccc',
                    borderWidth: 0.5,
                    borderRadius: 2
                },
                text: {
                    color: '#999999',
                    fontSize: 14,
                }
            }
        }
        return style;
    }

    _imageClick = () => {

    }

    _renderMulti = (status /*0:故障能处理，1：故障不能处理*/, typeGroup: Array, levelGroup: Array) => {
        let inputType = ['s2Text', 's3Text']; // 巡检反馈
        let faultType = ['faultDes0', 'faultDes1']; // 故障描述
        let typeIndex = ['typeIndex0', 'typeIndex1'];
        let rankIndex = ['rankIndex0', 'rankIndex1'];
        let dealText = ['dealText0', 'dealText1'];
        let imageIds = [imageIds0, imageIds1];
        return (
            <ScrollView>
                <Text style={styles.groupTitle}>${['巡检', '维保'][this.type]}反馈</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        placeholder={`请输入${['巡检', '维保'][this.type]}反馈（若无可不填）`}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ [inputType[status]]: text })}
                        value={this.state[inputType[status]]}
                    />
                </View>
                <Text style={styles.groupTitle}>故障描述</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        placeholder={`请输入故障描述（若无可不填）`}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ [faultType[status]]: text })}
                        value={this.state[faultType[status]]}
                    />
                </View>
                <Text style={styles.groupTitle}>故障类型</Text>
                <View style={{ flexDirection: 'row', height: 32 }}>
                    {
                        typeGroup.map((item, i) => {
                            const s = this._getBtnRadioStyle(i, status, 'type');
                            return (
                                <TouchableOpacity style={s.container} key={i} onPress={() => {
                                    this.setState({
                                        [typeIndex[status]]: i
                                    })
                                }}>
                                    <Text style={s.text}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.groupTitle}>故障等级</Text>
                <View style={{ flexDirection: 'row', height: 32 }}>
                    {
                        levelGroup.map((item, i) => {
                            const s = this._getBtnRadioStyle(i, status);
                            return (
                                <TouchableOpacity style={s.container} key={i} onPress={() => {
                                    this.setState({
                                        [rankIndex[status]]: i
                                    })
                                }}>
                                    <Text style={s.text}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.groupTitle}>处理方式</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        placeholder={'请输入处理方式（若无可不填）'}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ [dealText[status]]: text })}
                        value={this.state[dealText[status]]}
                    />
                </View>
                <GridImagePicker
                    cols={4}
                    onPhotoTapped={(picture, imageId) => {
                        console.log(imageId)
                        let source = { uri: picture.uri };
                        let images = status === 0 ? this.state.uploadImages0 : this.state.uploadImages1;
                        images.push(source);
                        imageIds[status].push(imageId);
                        let check = status === 0 ? "uploadImages0" : "uploadImages1";
                        this.setState({
                            [check]: images
                        })
                    }}
                    images={status === 0 ? this.state.uploadImages0 : this.state.uploadImages1}
                />
            </ScrollView>
        )
    }

    _renderContent() {
        const typeGroup = ['机械故障', '控制故障', '电气故障'];
        const levelGroup = ['I级', 'II级', 'III级'];
        switch (this.state.selectedIndex) {
            case 0: {
                return (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextInput
                            placeholder={`请输入${['巡检', '维保'][this.type]}反馈（若无可不填）`}
                            multiline={true}
                            style={[styles.textInput, { marginTop: 12 }]}
                            onChangeText={(text) => this.setState({ s1Text: text })}
                            value={this.state.text}
                        />
                    </View>
                )
            }
            case 1: {
                return this._renderMulti(0, typeGroup, levelGroup);
            }
            case 2: {
                return this._renderMulti(1, typeGroup, levelGroup);

            }
        }
    }


    _render() {
        const btnGroup = [`${['巡检', '维保'][this.type]}正常`, '故障能处理', '故障不能处理']
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', height: 47 }}>
                    {
                        btnGroup.map((item, i) => {
                            const s = this._getSelectedStyle(i);
                            return (
                                <TouchableOpacity style={s.container} key={i} onPress={() => {
                                    this.setState({
                                        selectedIndex: i
                                    })
                                }}>
                                    <Icon
                                        containerStyle={{ marginTop: 3 }}
                                        name={s.icon.name}
                                        type='material-community'
                                        color={s.icon.color}
                                        size={20}
                                    />
                                    <Text style={s.text}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Divider style={{ backgroundColor: '#EBEBEB' }} />
                {this._renderContent()}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(TaskUploadScreen);

const styles = Utils.PLStyle({
    container: {
        flex: 1,
    },
    textInput: {
        height: 110,
        width: '94%',
        padding: 10,
        backgroundColor: '#F9F9F9',
        fontSize: 15,
        color: '#666',
        borderColor: '#EBEBEB',
        borderRadius: 2,
        borderWidth: 1
    },
    groupTitle: {
        color: '#666',
        fontSize: 14,
        margin: 10
    }
})
