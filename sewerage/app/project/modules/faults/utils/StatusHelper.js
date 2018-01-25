export const StatusHelper = {
    getStatusPerform(status) {
        let perform = {
            backgroundColor: '',
            color: '',
        }
        switch (status) {
            case 0:

                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                perform = {
                    color:'#1AAD19',
                    backgroundColor: '#E8F6E8'
                }
                break;
            default:
                break;
        }
        return perform;
    },
    getRankPerform(rank) {
        let perform = {
            color: '#47A9EB',
            backgroundColor: '#ECF6FD',
        }
        let text = '';
        switch (rank) {
            case 0:
                perform = {
                    backgroundColor:'#FFE2DF',
                    color:'#FF6E61',
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
    getBreakdownSource(status){
        let source = '';
        switch(status){
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
    getBreakdownType(type) {
        let typeName = '';
        switch(type) {
            case 0:
                typeName = '机械故障';
                break;
            case 1:
                typeName = '机械故障';
                break;
            case 2:
            default:
                typeName = '电器故障';
        }
        return typeName;
    }
}