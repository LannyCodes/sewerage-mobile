/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions
} from "react-native"
import { WrapScreen } from '../../wrap';
import * as Utils from '../../../../core/utils';
import { GridView } from '../../../components';
import { PicturesPreview } from '../../../components';
import { config } from '../../../../config/setting'

const screenWidth = Dimensions.get('window').width;
export class WOResult extends Component {
    constructor(props) {
        super(props)
        this.state={
            showImages:[]
        }
    }

    _imageClick = (images) => {
        console.log(images);
        let showImages = images.map((item,index)=>{
            return {url:item.uri}
        })
        this.setState({
            showImages:showImages
        })
        this._pp.showPreview();
    }

    _renderItem = (item, index) => {
        let images = this._getImageUris(item);
        return (
            <View >
                <View style={{ paddingLeft: 10 }}>
                    <View style={styles.divider} />
                    <Text style={{ fontSize: 15, color: '#666666', marginTop: 14 }}>处理备注</Text>
                    <Text style={[styles.headerFootText, { color: '#333333', marginBottom: 11, marginTop: 14 }]}>{item.CONTENT}</Text>
                </View>
                <GridView
                    imgs={images}
                    containerStyle={{ marginBottom: 20 }}
                    columns={4}
                    gridClick={this._imageClick.bind(this,images)} />
            </View>
        )
    }

    _getImageUris=(item)=>{
        return item.ATTACHMENT_IDS.map((item,index)=>{
            console.log(item.FILE_PATH)
            return {uri:config.ImageServer+item.FILE_PATH}
        })
    }

    render() {
        const picWidth = (screenWidth - 10) / 4 - 10;
        let data = this.props.data;
        return (
            <View style={{ backgroundColor: '#ffffff', marginTop: 11 }}>
                <View style={styles.listTag}>
                    <View style={{ backgroundColor: '#42BB55', height: 16, width: 3 }} />
                    <Text style={{ color: '#666666', fontSize: 15, marginLeft: 5 }}>处理结果</Text>
                </View>
                {
                    data.length > 0 ? data.map((item, index) => {
                        return this._renderItem(item, index)
                    }) : <Text style={[styles.headerFootText, { marginLeft:10,marginBottom: 11}]}>暂无</Text>
                }
                <PicturesPreview
                    ref={pp => this._pp = pp}
                    images={this.state.showImages} />
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    listTag: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listFooter: {
        marginTop: 10,
        backgroundColor: '#ffffff',
    },
    headerFootText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 19,
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#ebebeb",
    },
})