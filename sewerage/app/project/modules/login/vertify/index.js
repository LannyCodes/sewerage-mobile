/**
 * Created by InforeXuan on 2017/5/12.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, Keyboard} from 'react-native';
import styles from '../LoginStyles'
import {VertifyPart} from './VertifyPart'
import {WrapScreen} from "../../wrap";

class VertifyScreen extends WrapScreen {

    constructor(props: Object) {
        super(props);
        this.state = {
            inputPhoneNum: '',
            inputVertify: ''
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.moveKeyboard(this, 'all', 120)
    }

    _keyboardDidHide() {
        this.resetKeyboard(this, 'all')
    }

    /**
     * 上移动页面，用于TextInput弹出键盘遮挡表单
     * @param platform
     * @param distance
     */
    moveKeyboard(self, platform: string, distance: number) {
        if (platform === 'all' || platform === 'ios') {
            self.refs.scrollView.scrollTo({y: distance, animated: true});
        }
    }

    /**
     * 重置ScrollView，用于TextInput弹出键盘遮挡表单
     * @param platform
     */
    resetKeyboard(self, platform: string) {
        if (platform === 'all' || platform === 'ios') {
            self.refs.scrollView.scrollTo({y: 0, animated: true});
        }
    }

    render() {
        return (
            <ScrollView ref="scrollView" style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.content}>重置密码</Text>
                    {VertifyPart(this)}
                </View>
            </ScrollView>
        );
    }
}

export default VertifyScreen;