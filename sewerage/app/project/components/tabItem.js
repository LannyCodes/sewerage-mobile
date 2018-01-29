/**
 * Created by coderxuan on 2017/5/6.
 */
import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import * as Utils from '../../core/utils/index'
import * as Actions from '../redux/actions';
import { connect } from "react-redux";

class TabBarItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage;
        let badge = this.props.badges[this.props.routeName];
        return (
            <View style={{ backgroundColor: 'green' }}>
                <Image
                    resizeMode={'contain'}
                    source={this.props.focused
                        ? selectedImage
                        : this.props.normalImage}
                    style={styles.image}
                />
                {
                    badge ? <View style={[styles.badge, { borderRadius: 20 }]}>
                        <Text style={{ fontSize: 12, color: '#ffffff' }}>{badge}</Text>
                    </View> : <View />
                }
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        // currentRouteName: state.common.currentTabIndex.routeName,
        badges: state.Common.tabBadge
    }
}

module.exports = {
    TabBarItem: connect(mapStateToProps)(TabBarItem)
}

const styles = Utils.PLStyle({
    image: {
        width: 26,
        height: 24,
        ios: {
            marginTop: -16
        }
    },
    badge: {
        backgroundColor: '#E44036',
        height: 18,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E44036',
        borderWidth:1,
        position: 'absolute',
        left: 17,
        bottom: 3,
    }
});

