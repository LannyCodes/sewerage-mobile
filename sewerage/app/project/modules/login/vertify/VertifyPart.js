/**
 * Created by coderxuan on 2017/5/15.
 */
import React from 'react';
import { View, TextInput } from 'react-native';
import Otp from '../Otp'
import { checkOtp, checkPhoneAndOtp, submitOtp } from '../LoginFunc'
import styles from '../LoginStyles'
import { SubmitBtn } from "../../../components/submitBtn";
import { Divider } from 'react-native-elements'

export function VertifyPart(self) {
    return (
        <View >
            <View>
                <View style={[{ marginTop: 41 }, styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={self.state.inputPhoneNum}
                        onChangeText={(text) => {
                            text = text.replace('.', '');
                            self.setState({ inputPhoneNum: text });
                        }}
                        placeholder="输入手机号码"
                        placeholderTextColor="#d2d2d2"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        maxLength={11}
                    />
                </View>
                <Divider style={{ backgroundColor: '#ddd' }} />
            </View>
            <View>
                <View style={[{ marginTop: 10.5 }, styles.inputContainer]}>
                    <TextInput
                        style={styles.vertifyInput}
                        value={self.state.inputVertify}
                        onChangeText={(text) => {
                            text = text.replace('.', '');
                            self.setState({ inputVertify: text });
                        }}
                        placeholderTextColor="#d2d2d2"
                        placeholder="输入验证码"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        maxLength={6}
                    />
                    <View style={styles.otpContainer}>
                        <View style={styles.columnLine}>
                        </View>
                        <Otp style={styles.otp} enable={true}
                            onPress={() => checkOtp(self)}
                            telephone={self.state.inputPhoneNum}
                        />
                    </View>
                </View>
                <Divider style={{ backgroundColor: '#ddd' }} />
            </View>
            <SubmitBtn
                style={{ marginTop: 40.5 }}
                text={'下一步'}
                telephone={self.state.inputPhoneNum}
                onPress={() => submitOtp(self)}
                check={() => checkPhoneAndOtp(self)} />
        </View>
    )
}