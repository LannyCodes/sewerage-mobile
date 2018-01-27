export const StatusHelper = {
    getAuditStatusPerform(status) {
        let auditPerform = {
            backgroundColor:'#FEF5EB',
            color:'#FAA346',
        }
        let auditText = '';
        switch (status) {
            case 0:
                auditText='待审核'
                break;
            case 1:
                auditText = '待处理'
                break;
            case 2:
                auditText = '处理完待审'
                break;
            case 3:
                auditText = '已完成'
                break;
            case 4:
                auditText = '废弃';
                break;
            case 5:
                auditText = '驳回';
                break;
            default:
                break;
        }
        return {auditPerform,auditText}
    },
    getStatusPerform(status) {//工单处理状态
        let statusPerform = {
            backgroundColor: '',
            color: '',
        }
        let statusText = ''
        switch (status) {
            case 0:
                statusPerform = {
                    color: '#FF6E61',
                    backgroundColor: '#ffe2df',
                }
                statusText = '待处理'
                break;
            case 1:
                statusPerform = {
                    color: '#47A9EB',
                    backgroundColor: '#ECF6FD',
                }
                statusText = '正在处理'
                break;
            case 2:
                statusPerform = {
                    color: '#FAA346',
                    backgroundColor: '#FEF5EB'
                }
                statusText = '现场处理';
                break;
            case 3:
                statusPerform = {
                    color: '#1AAD19',
                    backgroundColor: '#E8F6E8'
                }
                statusText = '处理完成';
                break;
            default:
                break;
        }
        return { statusPerform, statusText };
    },
    getRankPerform(rank) {//故障等级
        let perform = {
            color: '#47A9EB',
            backgroundColor: '#ECF6FD',
        }
        let text = '';
        switch (rank) {
            case 0:
                perform = {
                    backgroundColor: '#FFE2DF',
                    color: '#FF6E61',
                }
                text = "I级"
                break;
            case 1:
                text = 'II级'
                perform = {
                    backgroundColor: '#FEF5EB',
                    color: '#FAA346',
                }
                break;
            case 2:
                perform = {
                    color: '#47A9EB',
                    backgroundColor: '#ECF6FD',
                }
                text = 'III级'
                break;
            default:
                break;
        }
        return {
            perform,
            text,
        }
    },
    getBreakdownSource(status) {//故障来源
        let source = '';
        switch (status) {
            case 0:
                source = '巡检';
                break;
            case 1:
                source = '维保';
                break;
            case 2:
            default:
                source = '其他';
        }
        return source;
    },
    getBreakdownType(type) {//故障类型
        let typeName = '';
        switch (type) {
            case 0:
                typeName = '机械故障';
                break;
            case 1:
                typeName = '控制故障';
                break;
            case 2:
            default:
                typeName = '电器故障';
        }
        return typeName;
    }
}