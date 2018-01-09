import baseRequest from '../../../../app/core/api/baseRequest'
import Urls from '../urls'

/**
 * 登录接口
 */
class GetInspectionTaskList extends baseRequest {
    requestUrl() {
        return Urls.Inspections.getTaskList
    }
}

export {GetInspectionTaskList};