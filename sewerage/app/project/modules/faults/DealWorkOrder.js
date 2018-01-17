/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    TextInput,
    Dimensions
} from "react-native"
import { WrapScreen } from '../wrap'
import * as Utils from '../../../core/utils'
import { GridView } from '../../components'
// import ImagePicker from 'react-native-image-picker';
const screenWidth = Dimensions.get('window').width;

class DealWorkOrderScreen extends WrapScreen {
    constructor(props) {
        super(props)
        this.header = {
            title: '故障工单处理',
            right: {
                text: '提交',
                color: '#42BD56',
                fontSize: 16,
                onPress: this._submit
            }
        };
    }

    //func

    _submit = () => {
        console.log('haha')
    }

    // _imagePick = () => {
    //     let self = this
    //     const options = {
    //         title: '请选择',
    //         cancelButtonTitle: '取消',
    //         takePhotoButtonTitle: '拍照',
    //         allowsEditing: false,
    //         chooseFromLibraryButtonTitle: '选择相册',
    //         cameraType: 'back', //前置或后置摄像头
    //         // mediaType: 'photo', //'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
    //         //  maxWidth: 500,
    //         quality: 0.75, //0 to 1, photos only
    //         //   allowsEditing: true, //bool - enables built in iOS functionality to resize the image after selection
    //         noData: false, // If true, disables the base64 data field from being generated (greatly improves performance on large photos)
    //         storageOptions: { // 如果设置，则保存在设置的路径下而不是一个temp目录
    //             //  skipBackup: true, // 如果true，照片将不会被备份到icloud
    //             // path: 'images',
    //             skipBackup: true, // 如果true，照片将不会被备份到icloud
    //             cameraRoll: true, //如果true，裁剪的照片讲保存到手机中
    //         }
    //     };
    //     try {
    //         ImagePicker.showImagePicker(options, (response) => {
    //             if (response.didCancel) {
    //                 console.log('User cancelled photo picker');
    //             }
    //             else if (response.error) {
    //                 console.log('ImagePicker Error: ', response.error);
    //             }
    //             else if (response.customButton) {
    //                 console.log('User tapped custom button: ', response.customButton);
    //             }
    //             else {
    //                 self.props.onPhotoTapped(response);
    //             }
    //         });
    //     } catch (exception) {
    //         console.log(exception)
    //     }
    // }

    _render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput
                        ref={textInput => this._textInput = textInput}
                        style={styles.text}
                        multiline={true}
                        placeholder="请输入巡检反馈（若无可不填）" />
                </View>
                <GridView
                    marginLeft={10}
                    marginRight={10}
                    width={screenWidth - 20}
                    isShowAdd={true}
                    showDelete={true}
                    // addGrid={this._imagePick}
                />
            </View>
        )
    }
}

export default DealWorkOrderScreen;

const styles = Utils.PLStyle({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: "#ffffff",
        flex: 1,
    },
    textContainer: {
        height: 100,
        backgroundColor: '#f9f9f9',
        paddingTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
        borderWidth: 0.5,
        borderColor: '#ebebeb',
    },
    text: {
        color: '#cccccc',
        fontSize: 15,
        backgroundColor: 'transparent',
        flex: 1,
    }
})