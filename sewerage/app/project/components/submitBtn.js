/**
 * Created by coderxuan on 2017/5/15.
 */

import React, {Component} from 'react'

import {
    View,
    Text,
    TouchableOpacity
}from "react-native"
import PropTypes from 'prop-types'
import * as Utils from "../../core/utils/style";

export class SubmitBtn extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        ...View.propTypes,
        // 属性类型
        text: PropTypes.string,
        check: PropTypes.func,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        // 默认属性值
        text: '完成',
    };

    render() {
        let _check = this.props.check && this.props.check();
        if (_check) {
            return (
                <TouchableOpacity style={this.props.style} onPress={() => this.props.onPress()}>
                    <View style={styles.submitView}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.submitText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>)
        } else {
            return (
                <View style={this.props.style}>
                    <View style={styles.unsubmitView}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.submitText}>{this.props.text}</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = Utils.PLStyle({
    submitView: {
        backgroundColor: '#0ba8fd',
        width: 345,
        height: 44,
        borderColor: '#0ba8fd',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unsubmitView: {
        backgroundColor: '#cccccc',
        width: 345,
        height: 44,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: 18
    },
})
