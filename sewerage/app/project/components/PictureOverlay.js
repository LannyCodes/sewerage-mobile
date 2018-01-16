/**
 * Created by coderxuan on 2017/5/26.
 */
/**
 * <PictureOverlay
 cache={true} //如果是本地图片，必须设置为false
 ref={(po) => {this.po = po}}
 url={this.state.clickImageUri}
 />
 */
import React, {Component} from 'react';
import {
    Image, Dimensions, TouchableWithoutFeedback, View
} from 'react-native';
import {OverlayContainer} from './OverlayContainer';
import PropTypes from 'prop-types'
import * as Utils from "../../core/utils/style";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export class PictureOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        ...View.propTypes,
        cache: PropTypes.bool,
    };

    static defaultProps = {
        cache: false,
    };

    showModal() {
        this.oc.showModal();
    }

    _closeModal() {
        this.oc.closeModal()
    }


    render() {
        return (
            <OverlayContainer
                ref={(oc) => {
                    this.oc = oc
                }}
                defaultClickClose={true}>
                <TouchableWithoutFeedback onPress={() => this._closeModal()}>
                    <Image
                        resizeMode={Image.resizeMode.contain}
                        style={styles.image}
                        source={{uri: this.props.url}}/>
                </TouchableWithoutFeedback>
            </OverlayContainer>
        );
    }
}

const styles = Utils.PLStyle({
    image: {
        width: screenWidth,
        height: screenHeight,
        alignSelf: 'center',
    }
});
