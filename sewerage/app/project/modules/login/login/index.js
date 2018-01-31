/**
 * Created by InforeXuan on 2017/5/12.
 */
import React from 'react';
import { ScrollView, View, Text, Keyboard, Image } from 'react-native';
import { LoginPart } from '../LoginPart'
import styles from '../LoginStyles'
import { WrapScreen } from "../../wrap";
import * as Assets from '../../../assets'
import * as Utils from '../../../../core/utils'
class LoginScreen extends WrapScreen {

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

    constructor(props: Object) {
        super(props);
        this.state = {
            showMima: false,
            inputPhoneAndEmail: '',
            inputPwd: ''
        }
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


    render() {
        return (
            <ScrollView ref="scrollView" style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 0.65 * Utils.sw, height: 0.65 * Utils.sw * 0.125, marginTop: 160 }}
                        source={Assets.Components.logo}
                    />
                    {LoginPart(this)}
                </View>
            </ScrollView>
        );
    }
}

export default LoginScreen;