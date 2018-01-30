import Urls from '../../config/api/urls';
import * as Utils from '../../core/utils';
export const FileUpload = (path,fileName)=>{
    let file = {uri: path, type: 'multipart/form-data', name: fileName};
    let params = {'file': file};
    return new Promise( async (resolve,reject)=>{
        try {
            let upload = await Utils.post(this,Urls.Common.fileUpload,params);
            let saveParams = {'files': `[{'FILE_SIZE':${upload.FILE_SIZE},'FILE_NAME':'${upload.FILE_NAME}','FILE_TYPE':'${upload.FILE_TYPE}','FILE_PATH':'${upload.FILE_PATH}'}]`};
            let fileSave = await Utils.post(this, Urls.Common.fileSave, saveParams);
            resolve({fileSave,upload})
        }catch(err){
            console.log(err);
            reject(err);
        }
    })
}