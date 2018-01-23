import React from "react";
import { Component } from 'react'
import { View } from "react-native";
import _ from 'lodash'
import * as Utils from "../../core/utils/index";
import { USER_KEY } from '../../config/setting'
import { KHeader } from "../components";
import Orientation from 'react-native-orientation';
import store from '../redux/store/configStore'

/**
 * BaseScreen
 */
export class WrapScreen extends Component {
    componentDidMount() {
        if (!_.isEqual(this.getCurrentRouteName(), "Splash")) {
            this.showStatusBar('transparent');
        }
    }

    constructor(props) {
        super(props);
        this.store = store;
        this.routeName = this.getCurrentRouteName();
        storage.load({
            key: USER_KEY.USER_STAGE_KEY
        }).then(data => {
            if (!_.isNull(data.token)) {
                _USERTOKEN_ = data.token;
            } else {
                _USERTOKEN_ = '';
            }
        }).catch(err => {
            _USERTOKEN_ = '';
        })
    }

    _header = () => {
        return {
            title: '',
        }
    }

    render() {
        let t = this.getCurrentRouteName();
        return (
            <View style={styles.container}>
                <KHeader header={this._header()} title={t} onLeftPress={() => {
                    this.props.navigation.goBack()
                }} />
                {this._render()}
            </View>
        )
    }

    showStatusBar = (color?: string) => {
        Utils.StatusBarUtil.show();
        if (!_.isNull(color)) Utils.StatusBarUtil.setBackgroundColor(color).setTranslucent(true)

    };

    hideStatusBar = () => {
        Utils.StatusBarUtil.hidden();
    }

    getCurrentRouteName = () => {
        if (_.isNull(this.props.navigation)) return;
        return this.props.navigation.state.routeName
    }

    // 设置横竖屏，但是是整个应用切换横竖屏了
    setRequestedOrientation = (param) => {
        // 'landscape'--横屏
        // 'portrait'--竖屏
        switch (param) {
            case 'landscape':
                Orientation.lockToLandscape();
                break;
            case 'landscapeLeft':
                Orientation.lockToLandscapeLeft();
                break;
            case 'landscapeRight':
                Orientation.lockToLandscapeRight();
                break;
            case 'portrait':
                Orientation.lockToPortrait();
                break;
            default:
                break;
        }
    }
}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
});