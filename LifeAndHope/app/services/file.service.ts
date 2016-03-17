import {PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'


export class FileService extends DatabaseService {
    protected static apiName: string = 'files';


    public static addFile(file: File, container: string): PromiseType<any> {
        let formData = new FormData();
        formData.append('file', file);

        return super.post('/' + container + '/file', formData);
    }

    public static addContainer(container: string): PromiseType<any> {
        return super.post('', {
            'container_name': container
        });
    }


    public static getAllFilesProperties(container: string): PromiseType<any> {
        return super.get('/' + container + '/file/all')
    }

    public static getContainer(container: string): PromiseType<any> {
        return super.get('/' + container);
    }


    /**
     * The file is returned as base64 encoded data
     * Use atob(data) to decode the data
     */
    public static getFile(id: string, container: string): PromiseType<any> {
        return super.get('/' + container + '/file/' + id, this.fileConfiguration());
    }

    /**
     * The file is returned as base64 encoded data
     * Use atob(data) to decode the data
     */
    public static getFileByName(fileName: string, container: string): PromiseType<any> {
        return super.get('/' + container + '/file/filename/' + fileName, this.fileConfiguration());
    }


    /* Configuration defining response type and response data transformer for files */
    static fileConfiguration() {
        let configuration = super.configuration();

        configuration['responseType'] = 'arraybuffer';

        /* Convert arraybuffer to base64 encoded binary */
        configuration['transformResponse'] = data => {
            var binary = '';
            var bytes = new Uint8Array( data );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
        };

        configuration['progress'] = progressEvent => {
            console.log("df",progressEvent);
        };

        return configuration;
    }
}
