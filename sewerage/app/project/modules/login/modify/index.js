/**
 * Created by InforeXuan on 2017/5/12.
 */
import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard } from 'react-native';
import styles from '../LoginStyles'
import { ModifyPart } from './ModifyPart'
import { WrapScreen } from "../../wrap";
class ModifyScreen extends WrapScreen {

    constructor(props: Object) {
        super(props);
        this.state = {
            showNewMima: false,
            showConfirmMima: false,
            showOldMima: false,
            inputNewPwd: '',
            inputEnNewPwd: '',
            inputOldPwd: ''
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

    /**
     * 上移动页面，用于TextInput弹出键盘遮挡表单
     * @param platform
     * @param distance
     */
    moveKeyboard(self, platform: string, distance: number) {
        if (platform === 'all' || platform === 'ios') {
            self.refs.scrollView.scrollTo({ y: distance, animated: true });
        }
    }

    /**
     * 重置ScrollView，用于TextInput弹出键盘遮挡表单
     * @param platform
     */
    resetKeyboard(self, platform: string) {
        if (platform === 'all' || platform === 'ios') {
            self.refs.scrollView.scrollTo({ y: 0, animated: true });
        }
    }

    _keyboardDidShow() {
        this.moveKeyboard(this, 'all', 120)
    }

    _keyboardDidHide() {
        this.resetKeyboard(this, 'all')
    }

    render() {
        return (
            <ScrollView ref="scrollView" style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.content}>修改密码</Text>
                    {ModifyPart(this)}
                </View>
            </ScrollView>
        );
    }
}

export default ModifyScreen;