/** 
 * Created by Infore.Wlun. 
 */

 import React, { Component } from 'react' 
 import {
    View,
    Modal
 } from "react-native"
//  import PropTypes from 'prop-types';
 import ImageViewer from 'react-native-image-zoom-viewer';

 export class PicturesPreview extends Component {
     constructor(props){
         super(props)
         this.state={
             visible:false
         }
     }

     static propTypes = {
         images:PropTypes.array,
     };

     static defaultProps = {
         images:[],//[{url:'/image'}]这样的数组
     };

    _closeModal=()=>{
        this.setState({
            visible:false,
        })
    }

    showPreview=()=>{
        this.setState({
            visible:true,
        })
    }
 
     render(){
         return(
            <Modal
                visible={this.state.visible}
                animationType={'slide'}>
                <ImageViewer 
                    imageUrls={this.props.images}
                    onClick={this._closeModal}/>
            </Modal>
         )
     } 
 }
