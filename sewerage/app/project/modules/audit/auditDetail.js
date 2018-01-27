import React from 'react';

import { WrapScreen } from "../wrap";
import { connect } from "react-redux";
import * as Utils from "../../../core/utils";
import Urls from "../../../config/api/urls";
import * as Actions from "../../redux/actions";
import { Status } from "../../../config/api/api.config";
import { ErrorPage, Loading, Dialog } from "../../components";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import AuditWBDetailComponent from './auditWBDetail'
const PROCESSTYPE = {
    INSPECTION: 'inspection_plan_process', // 巡检
    MAINTENANCE: 'maintenance_plan_process', // 维保
    BREAKDOWN: 'breakdown_bill_process', // 故障工单
    PRODUCT: 'product_store_process' // 库存变更
}
class AuditDetailScreen extends WrapScreen {

    constructor(props) {
        super(props);
        this.processType = '';
    }

    componentDidMount() {
        const { processId, processType } = this.props.navigation.state.params;
        this.processType = processType;
        let params = { 'processId': processId, 'processType': processType }
        this.store.dispatch(Actions.get(this, Urls.Audit.getAuditDetail, params)); // 请求
    }

    _header = () => {
        return {
            title: "审核详情",
        };
    }

    _renderContentView = (processType, detail) => {
        let contentView = null;
        switch (processType) {
            case PROCESSTYPE.INSPECTION:
                contentView = (<AuditWBDetailComponent auditDetail={detail} />)
                break;
            case PROCESSTYPE.MAINTENANCE:
                contentView = (<AuditWBDetailComponent auditDetail={detail} />)
                break;
            case PROCESSTYPE.BREAKDOWN:
                contentView = (<AuditWBDetailComponent auditDetail={detail} />)
                break;
            case PROCESSTYPE.PRODUCT:
                contentView = (<AuditWBDetailComponent auditDetail={detail} />)
                break;
        }
        return contentView
    }

    _render() {
        const detail = this.props.auditDetail;
        if (this.props.requestStatus === Status.SUCCESS) {
            if (!Loading.checkData(detail)) return;

            return (
                <View style={{ flex: 1 }}>
                    {this._renderContentView(this.processType, detail)}
                </View>
            )
        } else if (this.props.requestStatus === Status.FAIL) {
            return (
                <ErrorPage />
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        auditDetail: state.Audit.getAuditDetail,
        requestStatus: state.Common.requestStatus
    }
}

export default connect(mapStateToProps)(AuditDetailScreen);
