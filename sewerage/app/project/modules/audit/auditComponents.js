import React, { Component } from 'react';
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { AuditProcessList, Dialog } from '../../components'
import * as Utils from "../../../core/utils";
import urls from '../../../config/api/urls';
renderCardStatus = (status) => {
    let st = { text: '待审核', color: '#FAA346', backgroundColor: '#FEF5EB' };
    if (status === 0) st = { text: '待审核', color: '#FAA346', backgroundColor: '#FEF5EB' };
    else if (status === 1) st = { text: '已驳回', color: '#47A9EB', backgroundColor: '#ECF6FD' };
    else if (status === 2) st = { text: '已废弃', color: '#FF6E61', backgroundColor: '#FFE2DF' };
    else if (status === 3) st = { text: '已通过', color: '#1AAD19', backgroundColor: '#E8F6E8' };
    return (
        <View style={[styles.cardView, { backgroundColor: st.backgroundColor }]}>
            <Text style={{ fontSize: 10, color: st.color }}>{st.text}</Text>
        </View>
    )
};


/** 审核流程记录*/
renderCheckLogs = (logs) => {
    return (
        <AuditProcessList data={logs} />
    );
};

const FQFLAG = 'abandon';
const BHFLAG = 'reject';
const TGFLAG = 'pass';

renderOperate = (context) => (
    <View style={styles.operate}>
        <TouchableOpacity style={styles.operateBox} onPress={() => { _auditFetch(context, FQFLAG) }}>
            <Text style={styles.text}>废弃</Text>
        </TouchableOpacity>
        <View style={{ height: 32, width: 0.5, backgroundColor: '#ccc' }} />
        <TouchableOpacity style={styles.operateBox} onPress={() => { _auditFetch(context, BHFLAG) }}>
            <Text style={styles.text}>驳回</Text>
        </TouchableOpacity>
        <View style={{ height: 32, width: 0.5, backgroundColor: '#ccc' }} />
        <TouchableOpacity style={styles.operateBox} onPress={() => { _auditFetch(context, TGFLAG) }}>
            <Text style={styles.text}>通过</Text>
        </TouchableOpacity>
    </View>
)

/**
 * 审核请求
 * 审核类型和流程ID在auditDetail中通过props传进来的
 */
_auditFetch = (context, checkType) => {
    Dialog.showInput('审核批注', '请输入审核批注（若无可不填）', (input) => {
        let params = {
            PROCESS_TYPE: context.props.processType, // 审核类型
            CHECK_TYPE: checkType, // 操作类型 reject 驳回 abandon 废弃 pass 通过
            PROCESS_ID: context.props.processId, // 流程ID
            CONTENT: input // 审核批注
        };
        Utils.fetch(context, urls.Audit.checkTask, params, 'get').then((data) => {
            // 审核成功
            DeviceEventEmitter.emit('AUDIT_REFRESH');
        });
    })
}

export { renderCardStatus, renderCheckLogs, renderOperate }

const styles = Utils.PLStyle({
    cardView: {
        width: 45,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,
    },
    operate: {
        height: 47,
        width: Utils.sw,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    operateBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
});
