import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import {WrapScreen} from "../wrap";
import {ScrollableTabBar} from '../../components/ScrollableTabViewBars';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import * as Actions from "../../redux/actions";
import {connect} from "react-redux";
import Urls from "../../../config/api/urls";

class ListCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

export default class FaultListScreen extends WrapScreen {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        header: {
            title: "故障处理",
        }
    }

    _keyExtractor = (item, index) => item.id;

    _renderList(data) {
        return(
            <FlatList
                keyExtractor = {this._keyExtractor}
                data={data}
                renderItem = {()=>{
                    return <ListCell/>
                }}
            />
        )
    }

    _render() {
        return (
            <View>
                <ScrollableTabView
                locked={true}
                renderTabBar={()=>{
                    <ScrollableTabBar
                        style={{height:50}}
                        tabStyle={{height:50}}
                        // scrollWithoutAnimation
                        activeTextColor='#42BB55'
                        inactiveTextColor='#333333'
                        backgroundColor="#fff"
                        underlineAlignLabel={true}
                        underlineStyle={{backgroundColor:'#42BB55',height:2}}
                    />
                }}>
                    {
                        this._renderList()
                    }
                    {
                        this._renderList()
                    }
                </ScrollableTabView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}
