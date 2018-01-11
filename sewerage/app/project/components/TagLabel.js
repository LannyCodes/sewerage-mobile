/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text
} from "react-native"
import * as Utils from '../../core/utils'
import PropTypes from 'prop-types';

export class TagLabel extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        height:PropTypes.number,
        backgroundColor:PropTypes.string,
        fontColor:PropTypes.string,
        fontSize:PropTypes.number,
        containerStyle:PropTypes.object,
    };

    static defaultProps = {
        backgroundColor:'#ECF6FD',
        fontColor:'#47A9EB',
        height:22,
        fontSize:12,
    };

    render() {
        return (
            <View style={[styles.container,{...this.props.containerStyle,backgroundColor:this.props.backgroundColor,height:22}]}>
                <Text style={[styles.text,{fontSize:this.props.fontSize,color:this.props.fontColor}]}>{this.props.children}</Text>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    container:{
        backgroundColor: 'red', 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: 'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        backgroundColor: 'transparent',
        marginLeft:10,
        marginRight:10,
    }
})