import React from 'react';
import {WrapScreen} from "../wrap";
import {connect} from "react-redux";
import * as Utils from "../../../core/utils";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Divider, Icon} from "react-native-elements";
import {GridImagePicker} from "../../components";

class TaskMaintenanceUploadScreen extends WrapScreen {

    constructor(props) {
        super(props);
        const {state, goBack} = this.props.navigation;
        this.header = {
            title: "巡检内容",
            right: {
                icon: 'save',
                type: 'feather',
                onPress: () => {
                    state.params.onComplete({
                        errorId: state.params.errorId,
                        errorStatus: '不能正常运行'
                    });
                    goBack();
                }
            }
        };
        this.state = {
            selectedIndex: 1,
            typeIndex: null,
            levelIndex: null,
            s1Text: '',
            uploadImages0: [],
            uploadImages1: [],
        }
    }

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

    _getBtnRadioStyle = (index, type) => {
        let style;
        let i = type === 'type' ? this.state.typeIndex : this.state.levelIndex;
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
        return (
            <ScrollView>
                <Text style={styles.groupTitle}>故障描述</Text>
                <View style={{alignItems: 'center'}}>
                    <TextInput
                        placeholder={'请输入巡检反馈（若无可不填）'}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({s1Text: text})}
                        value={this.state.text}
                    />
                </View>
                <Text style={styles.groupTitle}>故障类型</Text>
                <View style={{flexDirection: 'row', height: 32}}>
                    {
                        typeGroup.map((item, i) => {
                            const s = this._getBtnRadioStyle(i, 'type');
                            return (
                                <TouchableOpacity style={s.container} key={i} onPress={() => {
                                    this.setState({
                                        typeIndex: i
                                    })
                                }}>
                                    <Text style={s.text}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.groupTitle}>故障等级</Text>
                <View style={{flexDirection: 'row', height: 32}}>
                    {
                        levelGroup.map((item, i) => {
                            const s = this._getBtnRadioStyle(i);
                            return (
                                <TouchableOpacity style={s.container} key={i} onPress={() => {
                                    this.setState({
                                        levelIndex: i
                                    })
                                }}>
                                    <Text style={s.text}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={styles.groupTitle}>处理方式</Text>
                <View style={{alignItems: 'center'}}>
                    <TextInput
                        placeholder={'请输入处理方式（若无可不填）'}
                        multiline={true}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({s1Text: text})}
                        value={this.state.text}
                    />
                </View>
                <GridImagePicker
                    cols={4}
                    onPhotoTapped={(picture) => {
                        let source = {uri: picture.uri};
                        let images = status === 0 ? this.state.uploadImages0 : this.state.uploadImages1;
                        images.push(source);
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
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TextInput
                            placeholder={'请输入巡检反馈（若无可不填）'}
                            multiline={true}
                            style={[styles.textInput, {marginTop: 12}]}
                            onChangeText={(text) => this.setState({s1Text: text})}
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
        const btnGroup = ['巡检正常', '故障能处理', '故障不能处理']
        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', height: 47}}>
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
                                        containerStyle={{marginTop: 3}}
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
                <Divider style={{backgroundColor: '#EBEBEB'}}/>
                {this._renderContent()}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(TaskMaintenanceUploadScreen);

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
