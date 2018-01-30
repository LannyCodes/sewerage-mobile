import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Overlay } from 'teaset'
import * as Utils from '../../core/utils'
import { Divider } from "react-native-elements";

let key = null;
export const Dialog = {
    show(content, onSure, onCancel) {
        key = Overlay.show(sure(content, onSure, onCancel));
    },
    showInput(content, placeholder, onSure, onCancel, keyboardType) {
        key = Overlay.show(input(content, placeholder, onSure, onCancel, keyboardType));
    },
    hide() {
        Overlay.hide(key);
    }
};
const sure = (content, onSure, onCancel) => (
    <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
    >
        <View style={{
            backgroundColor: '#fff',
            minWidth: 260,
            minHeight: 100,
            borderRadius: 10,
            paddingTop: 10,
        }}>
            <View
                style={{ width: Utils.ws, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, color: '#333' }}>{content}</Text>
            </View>
            <Divider style={{ backgroundColor: '#ddd' }} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    onCancel && onCancel();
                    Dialog.hide();
                }}>
                    <Text style={{ fontSize: 16, color: '#666' }}>取消</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: '100%', backgroundColor: '#ddd' }} />
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    onSure && onSure();
                    Dialog.hide();
                }}>
                    <Text style={{ fontSize: 16, color: '#4ECC80' }}>确定</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Overlay.PopView>
);

const input = (content, placeholder, onSure, onCancel, keyboardType) => {
    let input = '';
    return (
        <Overlay.PopView
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <View style={{
                backgroundColor: '#fff',
                minWidth: 325,
                minHeight: 160,
                borderRadius: 10,
                paddingTop: 10,
            }}>
                <View style={{ width: Utils.ws, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, color: '#333' }}>{content}</Text>
                </View>
                <TextInput
                    style={{
                        height: 63,
                        marginLeft: 11,
                        marginRight: 11,
                        backgroundColor: '#F9F9F9',
                        borderRadius: 2,
                        padding: 5,
                        color: '#666',
                        marginBottom: 16
                    }}
                    keyboardType={keyboardType || 'default'}
                    onChangeText={(text) => input = text}
                    placeholder={placeholder}
                    multiline={true}

                />
                <Divider style={{ backgroundColor: '#ddd' }} />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {

                        onCancel && onCancel();
                        Dialog.hide();
                    }}>
                        <Text style={{ fontSize: 16, color: '#666' }}>取消</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '100%', backgroundColor: '#ddd' }} />
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        if (!onSure(input)) {  // 如果想hide 则return true 若不拦截则 return false
                            Dialog.hide();
                        }
                    }}>
                        <Text style={{ fontSize: 16, color: '#4ECC80' }}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Overlay.PopView >
    )
}