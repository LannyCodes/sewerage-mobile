import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import React, {Component} from "react";
import * as Utils from "../../core/utils/index";
import {Header, Icon} from "react-native-elements";
import _ from 'lodash'

/**
 *
 * 使用：
 如果header typeof Object ，会带有arrow-left ， 如果是 static defaultProps = {header="标题"} 则只有title

 this.header: '标题' // 只有标题

 this.header={
            title: "标题",
            right: {
                icon: 'home',
                type: 'entypo',
                onPress: () => {
                    alert('aaa')
                }
            }
        }

 this.header={
            title: "标题",
        }
 }
 */
export class KHeader extends Component {
    constructor(props) {
        super(props);
    }

    _renderHeader = (header, title) => {
        if (_.isNull(header)) return (<View/>);
        else if (_.isString(header) && _.isEqual(header, 'none')) return (<View/>);
        else if (_.isString(header) && !_.isEqual(header, 'none')) {
            return (
                <Header
                    backgroundColor={'#F9F9F9'}
                    centerComponent={{ text: header, style: { fontSize: 20, color: '#323232' } }}
                />
            )
        }
        else if (_.isObject(header)) {
            let t = this.isNoTitle(header) ? title : header.title;
            return (
                <Header
                    backgroundColor={'#F9F9F9'}
                    leftComponent={
                        this._renderLeft(header)
                    }
                    centerComponent={{ text: t, style: { fontSize: 17, color: '#323232' } }}
                    rightComponent={
                        this._renderRight(header)
                    }
                />
            )
        }
    };

    _renderLeft = (header) => {
        let left;
        if (this.isNoLeft(header)) {
            left = <Icon
                size={24}
                name={'chevron-left'}
                type='feather'
                color={'#42BB55'}
                onPress={this.props.onLeftPress}
            />
        } else {
            if (header.left.none) {
                left = (<View style={{width: 18}}/>)
            }
        }
        return left
    }

    _renderRight(header) {
        let right;
        if (this.isNoRight(header)) {
            right = (<View style={{width: 18}}/>)
        } else {
            if (header.right.text) {
                //文字
                right = (
                    <TouchableOpacity
                        onPress={header.right.onPress}>
                        <Text style={{
                            fontSize: header.right.fontSize,
                            color: header.right.color||'#42BB55',
                        }}>{header.right.text}</Text>
                    </TouchableOpacity>
                )
            } else {
                right = (
                    <Icon
                        size={18}
                        name={header.right.icon}
                        type={header.right.type}
                        color={header.right.color || '#42BB55'}
                        onPress={header.right.onPress}
                    />
                )
            }
        }
        return right;
    }

    render() {
        return (
            <View>
                {this._renderHeader(this.props.header, this.props.title)}
            </View>
        )
    }

    isNoRight = (header) => {
        return !(_.has(header, 'right') || _.isNull(header.right))
    }

    isNoLeft = (header) => {
        return !(_.has(header, 'left') || _.isNull(header.left));
    }

    isNoTitle = (header) => {
        return header.title === '' || !(_.has(header, 'title') || _.isNull(header.title))
    }
}
