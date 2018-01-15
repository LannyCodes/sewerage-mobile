import React, {Component} from 'react'
import {
    FlatList, Image, Text, TouchableOpacity,
    View,
} from "react-native"
import * as Utils from '../../../core/utils'
import PropTypes from 'prop-types'
import * as Assets from '../../assets'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker';

const PICKER_HOLDER = "PICKER_HOLDER";
const HOLDER_IMG = {uri: PICKER_HOLDER};

export class GridImagePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [
                HOLDER_IMG
            ]
        }
    }

    _keyExtractor = (item, index) => index;

    static propTypes = {
        cols: PropTypes.number
    };

    static defaultProps = {
        cols: 3
    };

    _selectPhotoTapped = () => {
        let me = this;
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
                    console.log(response)
                    let images = me.state.images;
                    let source = {uri: response.uri};
                    images.push(source);
                    images =_.drop(images);
                    me.setState({
                        images: images
                    })
                }
            });
        } catch (exception) {
            console.log(exception)
        }
    }


    _renderItem = ({item, index}) => {
        if (item.uri === PICKER_HOLDER) {
            return (
                <TouchableOpacity onPress={() => this._selectPhotoTapped()} style={{
                    width: Utils.sw / this.props.cols,
                    height: Utils.sw / this.props.cols,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={Assets.Home.work_selected}
                        style={{
                            width: Utils.sw / this.props.cols - 5,
                            height: Utils.sw / this.props.cols - 5,
                        }}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{
                    width: Utils.sw / this.props.cols,
                    height: Utils.sw / this.props.cols,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={item}
                        style={{
                            width: Utils.sw / this.props.cols - 5,
                            height: Utils.sw / this.props.cols - 5,
                        }}
                    />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <FlatList
                style={{marginTop: 10}}
                numColumns={4}
                keyExtractor={this._keyExtractor}
                data={this.state.images}
                renderItem={this._renderItem}
            />
        )
    }
}

const styles = Utils.PLStyle({});