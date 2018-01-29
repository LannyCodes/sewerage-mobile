/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Alert,
    TextInput,
    Dimensions
} from "react-native"
import { WrapScreen } from '../wrap'
import * as Utils from '../../../core/utils'
import { GridView, Loading } from '../../components'
import ImagePicker from 'react-native-image-picker';
import Urls from "../../../config/api/urls";
import { FileUpload } from '../../utils';
const screenWidth = Dimensions.get('window').width;

class DealWorkOrderScreen extends WrapScreen {
    constructor(props) {
        super(props)
        this.state = {
            imgs: []
        }
    }

    _header = () => {
        return {
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
        Alert.alert(
            '是否确定提交？',
            '确定提交内容',
            [
                {text:'取消'},
                {text:'确定',onPress:()=>this._handleWorkorder()}
            ]
        )
    }

    _imageAdd = (source) => {
        let imgs = this.state.imgs;
        imgs.push(source);
        this.setState({
            imgs: imgs
        })
    }

    _handleWorkorder = async () => {
        Loading.isLoading(true);
        try {
            // let uploadResults = this.state.imgs.map(async (item, index) => {
            //     return await FileUpload(item.uri, item.fileName);
            // })
            let uploadResults = [];
            for (const key in this.state.imgs) {
                if (this.state.imgs.hasOwnProperty(key)) {
                    const img = this.state.imgs[key];
                    try{
                        let upload = await FileUpload(img.uri,img.fileName);
                        console.log('hahaha');
                        uploadResults = uploadResults.concat(upload);
                    }catch(err){
                        return;
                    }
                }
            } 
            let params = {
                ID:this.props.navigation.state.params.ID,
                CONTENT:this.textValue || '',
                ATTACHMENT_IDS:uploadResults,
            }
            // await Utils.post(this,Urls.faults.breakdownBillHandle, params);
            Loading.isLoading(false);
            this.props.navigation.goBack();
        } catch (err) {
            console.log(err);
            Loading.isLoading(false);
        }
    }

    _imagePick = () => {
        let self = this
        const options = {
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            allowsEditing: false,
            chooseFromLibraryButtonTitle: '选择相册',
            cameraType: 'back', //前置或后置摄像头
            // mediaType: 'photo', //'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
            //  maxWidth: 500,
            quality: 0.75, //0 to 1, photos only
            //   allowsEditing: true, //bool - enables built in iOS functionality to resize the image after selection
            noData: false, // If true, disables the base64 data field from being generated (greatly improves performance on large photos)
            storageOptions: { // 如果设置，则保存在设置的路径下而不是一个temp目录
                //  skipBackup: true, // 如果true，照片将不会被备份到icloud
                // path: 'images',
                skipBackup: true, // 如果true，照片将不会被备份到icloud
                cameraRoll: true, //如果true，裁剪的照片讲保存到手机中
            }
        };
        try {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    self._imageAdd(response);
                }
            });
        } catch (exception) {
            console.log(exception)
        }
    }

    _deleteImage = (item, index) => {
        let imgs = this.state.imgs;
        imgs.splice(index, 1);
        this.setState({
            imgs: imgs
        })
    }

    _render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.text}
                        multiline={true}
                        placeholder="请输入巡检反馈（若无可不填）"
                        onChange={(event)=>this.textValue=event.nativeEvent.text}
                        // includeFontPadding={false}
                        textAlignVertical='top'
                        underlineColorAndroid="transparent" />
                </View>
                <GridView
                    containerStyle={{ marginTop: 20 }}
                    columns={4}
                    isShowAdd={true}
                    showDelete={true}
                    imgs={this.state.imgs.map((item)=>{return {uri:item.uri}})}
                    addGrid={this._imagePick}
                    deleteClick={this._deleteImage}
                />
            </View>
        )
    }
}

export default DealWorkOrderScreen;

const styles = Utils.PLStyle({
    container: {
        paddingTop: 20,
        backgroundColor: "#ffffff",
        flex: 1,
    },
    textContainer: {
        marginLeft: 10,
        marginRight: 10,
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