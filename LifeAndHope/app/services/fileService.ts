import {PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './databaseService'


export class FileService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'files';

    
    public static addFile(formData: FormData, container: string): PromiseType {
        return super.post('/' + container + '/file', formData);
    }

    public static getFile(id: string, container: string): PromiseType {
        return super.get('/' + container + '/file/' + id);
    }

    public static getFileByName(fileName: string, container: string): PromiseType {
        return super.get('/' + container + '/file/filename/' + fileName);
    }


    public static addContainer(container: string): PromiseType {
        return super.post('', {
            'container_name': container
        });
    }

    public static getContainer(container: string): PromiseType {
        return super.get('/' + container);
    }
}