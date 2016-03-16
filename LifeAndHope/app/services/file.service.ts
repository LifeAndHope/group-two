import {PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'


export class FileService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'files';


    public static addFile(formData: FormData, container: string): PromiseType<any> {
        return super.post('/' + container + '/file', formData);
    }

    public static getFile(id: string, container: string): PromiseType<any> {
        return super.get('/' + container + '/file/' + id);
    }

    public static getFileByName(fileName: string, container: string): PromiseType<any> {
        return super.get('/' + container + '/file/filename/' + fileName);
    }

    public static getAllFilesProperties(container: string): PromiseType<any> {
        return super.get('/' + container + '/file/all')
    }

    public static addContainer(container: string): PromiseType<any> {
        return super.post('', {
            'container_name': container
        });
    }

    public static getContainer(container: string): PromiseType<any> {
        return super.get('/' + container);
    }
}
