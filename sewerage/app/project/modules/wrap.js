import * as Utils from "../../core/utils/index";
import {Component} from 'react'
import {View} from "react-native";
import _ from 'lodash'
import React from "react";
import {Header} from "react-native-elements";

export class WrapScreen extends Component {
    componentDidMount() {
        if (!_.isEqual(this.getCurrentRouteName(), "Splash")) this.showStatusBar('transparent')
    }

    constructor(props) {
        super(props);
        this.utils = Utils
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'white'}
                    leftComponent={{ icon: 'menu', color: '#333' }}
                    centerComponent={{ text: '首页', style: { color: '#333' } }}
                    rightComponent={{ icon: 'home', color: '#333' }}
                />
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

}

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});