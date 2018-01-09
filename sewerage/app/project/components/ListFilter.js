/** 
 * Created by Infore.Wlun. 
 */

import React, { Component,PropTypes } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    // SectionList,
} from "react-native"
import { Button } from 'react-native-elements';

import * as Util from '../../core/utils';

export class ListFilter extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            formData:{}
        }
    }

    // static propTypes = {
    //     filterArray:PropTypes.array,
    //     headerType: PropTypes.object,
    //     containerStypes:PropTypes.object,
    //     columnNumber: PropTypes.number,
    //     comfirm:PropTypes.func,
    //     reset:PropTypes.func,
    // };

    static defaultProps = {
        filterArray: [],
        headerType: {},
        containerStyle: {},
        columnNumber: 3,
        
    };

    _itemClick = (value,keyName) => {
        let formData = this.state.formData;
        formData[keyName] = value;
        this.setState({
            formData:formData,
        })
    }

    _reset = () => {
        this.props.reset();
    }

    _comfirm = () => {
        this.props.comfirm(this.state.formData)
    }

    _renderContent = (item) => {
        return (
            <View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>{item.title}</Text>
                </View>
                <View style={styles.itemContainer}>
                    {
                        item.data.map((item1, index) => {
                            return (
                                <TouchableOpacity style={styles.item}
                                    onPress={this._itemClick.bind(this,item1.value,item.keyName)}
                                    activeOpacity={1}>
                                    <Text style={styles.itemText}
                                        activeOpacity={1}>{item1.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.filterArray.map((item, index) => {
                        return (
                            this._renderContent(item)
                        )
                    })
                }
                <View style={{ height: 48, width: '100%', backgroundColor: 'red', flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.buttonStyle, { borderWidth: 1, borderColor: '#e8e8e8' }]}
                        onPress={this._reset}>
                        <Text style={styles.buttonTitle}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this._confirm}
                        style={[styles.buttonStyle, { backgroundColor: '#42bb55' }]}>
                        <Text style={[styles.buttonTitle, { color: '#ffffff' }]}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = Util.PLStyle({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.48)',
    },
    section: {
        backgroundColor: '#fafafa',
        height: 39,
        justifyContent: 'center',
    },
    sectionText: {
        marginLeft: 20,
        color: '#666666',
        fontSize: 12,
    },
    itemContainer: {
        // flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: '#ffffff',
        height: 47,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ededed',
        borderWidth: 0.5,
    },
    itemText: {
        color: '#404040',
        fontSize: 14,
        flexDirection: 'row',
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 16,
        color: '#666666',
    }
})