import React from "react";
import {ActivityIndicator} from "react-native";
import Theme from "teaset/themes/ThemeDefault";
import Toast from "teaset/components/Toast/Toast";

export const Loading = {
    checkData(data) {
        if (!data) {
            this.showCustom();
            return false;
        } else {
            this.hideCustom();
            return true;
        }
    },
    isLoading(isLoad){
        isLoad ? this.showCustom() : this.hideCustom();
    },
    showCustom() {
        Loading.customKey = Toast.show({
            text: '正在加载中',
            icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor}/>,
            position: 'center',
            duration: 3000,
        });
    },
    hideCustom() {
        if (!Loading.customKey) return;
        Toast.hide(Loading.customKey);
        Loading.customKey = null;
    }
};