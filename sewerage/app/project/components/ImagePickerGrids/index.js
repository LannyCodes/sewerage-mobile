import React, {Component} from 'react'
import {
    FlatList, Image, TouchableOpacity, TouchableWithoutFeedback,
    View,
} from "react-native"
import * as Utils from '../../../core/utils'
import PropTypes from 'prop-types'
import * as Assets from '../../assets'
import ImagePicker from 'react-native-image-picker';
import {PictureOverlay} from "../PictureOverlay";

const PICKER_HOLDER = "PICKER_HOLDER";
const HOLDER_IMG = {uri: PICKER_HOLDER};

export class GridImagePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clickImageUri: '',
        }
    }

    _keyExtractor = (item, index) => index;

    static propTypes = {
        cols: PropTypes.number,
        images: PropTypes.array,
        onPhotoTapped: PropTypes.func,
    };

    static defaultProps = {
        cols: 3,
        images: []
    };

    componentWillReceiveProps(newProps) {
        console.log(newProps.images)
    }

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
                    me.props.onPhotoTapped(response);
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
                }} onPress={() => {
                    this.oc.showModal();
                    this.setState({
                        clickImageUri: item.uri
                    })
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
        let images = this.props.images;
        let renderImg = images.filter((val) => {
            return val.uri !== PICKER_HOLDER;
        })
        renderImg.push(HOLDER_IMG);
        return (
            <View>
                <FlatList
                    style={{marginTop: 10}}
                    numColumns={4}
                    keyExtractor={this._keyExtractor}
                    data={renderImg}
                    renderItem={this._renderItem}
                />
                <PictureOverlay
                    ref={(oc) => {
                        this.oc = oc
                    }}
                    cache={true} //如果是本地图片，必须设置为false
                    url={this.state.clickImageUri}/>
            </View>

        )
    }
}

const styles = Utils.PLStyle({});