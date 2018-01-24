/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View
} from "react-native"
import { WrapScreen } from "../../wrap";
import { SWFlatList } from '../../../components';
import { Divider, Icon } from 'react-native-elements';
import { ListCell } from './ListCell';
import { Components } from '../../../assets/index';

export class FaultsList extends Component {
    constructor(props) {
        super(props)
        this.isPullDown = false;
        this.isPullUp = false;
    }

    componentDidMount() {
        this._refresh()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.requestMsg.isFetching === false){
            this.isPullDown = false;
            this.isPullUp = false;
        }
    }

    _cellClicked = (type) => {
        if (type === 'faultsList') {
            this.props.navigation.navigate('FaultDetail');
        } else {
            this.props.navigation.navigate('WorkOrderDetail');
        }
    }

    _refresh = () => {
        let params = {
            pageIndex: 1,
            pageSize: 15,
        }
        this.isPullDown = true;
        this.props.requestAction(params);
    }

    _pullUp = () => {
        this.isPullUp = true;
        this.props.requestAction(this.props.requestMsg.body);
    }

    _keyExtractor = (item, index) => item.index;

    render() {
        let type = this.props.type;
        let tabLabel = this.props.tabLabel;
        let data = this.props.requestMsg.list;

        return (
            <SWFlatList
                style={{ flex: 1 }}
                refreshing={this.props.requestMsg.isFetching && this.isPullDown}
                onRefresh={this._refresh}
                pullUp={this._pullUp}
                pullingUp={this.props.requestMsg.isFetching && this.isPullUp}
                keyExtractor={this._keyExtractor}
                tabLabel={tabLabel}
                ItemSeparatorComponent={() => {
                    return (
                        <Divider />
                    )
                }}
                data={data}
                renderItem={({ item, index }) => {
                    let data = item
                    if (type === 'faultsList') {
                        data.title = item.EQUIPMENT_NAME;
                        data.content = item.BREAKDOWN_DESCRIBE;
                        data.person = item.CREATE_USER;
                        data.time = item.CREATE_TIME;
                        data.rank = item.RANK;
                    } else {
                        data.title = item.BREAK_NUMBER;
                        data.content = item.DESCRIBE;
                        data.person = item.USER_NAME;
                        data.time = item.CREATE_TIME;
                    }
                    return <ListCell
                        item={data}
                        index={index}
                        clickFunc={this._cellClicked.bind(this, type)} />
                }}
            />
        )
    }
}