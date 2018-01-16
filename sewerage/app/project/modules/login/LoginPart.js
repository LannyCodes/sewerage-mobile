/**
 * Created by coderxuan on 2017/5/15.
 */
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './LoginStyles'
import {checkInput, loginSubmit} from './LoginFunc'
import {CheckBox, SubmitBtn} from "../../components";
import * as Assets from '../../assets'
export function LoginPart(self) {
    return (
        <View>
            <View>
                <View style={[{marginTop: 31}, styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={self.state.inputPhoneAndEmail}
                        onChangeText={(text) => {
                            text = text.replace('.', '');
                            self.setState({inputPhoneAndEmail: text});
                        }}
                        placeholder="用户名/手机号"
                        placeholderTextColor="#d2d2d2"
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.line}/>
            </View>

            <View>
                <View style={[{marginTop: 10.5}, styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={self.state.inputPwd}
                        onChangeText={(text) => {
                            text = text.replace('.', '');
                            self.setState({inputPwd: text});
                        }}
                        placeholder="输入密码"
                        placeholderTextColor="#d2d2d2"
                        underlineColorAndroid='transparent'
                        secureTextEntry={!self.state.showMima}
                    />
                    <CheckBox
                        style={styles.inputEndIcon}
                        checkedImage={Assets.Login.eye}
                        unCheckedImage={Assets.Login.invalid}
                        onClick={(check) => self.setState({showMima: !check})}
                        isChecked={false}
                    />
                </View>
                <View style={styles.line}/>
            </View>
            <SubmitBtn
                style={styles.submit}
                text={'登录'}
                onPress={() => loginSubmit(self)}
                check={() => checkInput(self)}/>
            <TouchableOpacity onPress={() => self.props.navigation.navigate('Vertify')}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.forgetMima}>忘记密码？</Text>
            </TouchableOpacity>
        </View>
    )
}