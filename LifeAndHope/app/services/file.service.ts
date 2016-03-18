import {PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'


export class FileService extends DatabaseService {
    protected static apiName: string = 'files';


    public static getImagesForChild(id: string): PromiseType<Array<string>> {
        return new Promise( (resolve, reject) => {
            this.getFilesFromContainer('uuid_images')
                .then(files => {
                    resolve( files.map(file => 'data:' + file.file_type + ';base64,' + file.file_data) );
                })
                .catch(reject)
        })

    }


    /**
     * Retrieve all files from a container.
     * The file data is represented in binary and encoded as base64
     *
     * @param container Container name
     * @returns {Promise}
     */

    //TODO: Maybe this should support filtering files retrieved?
    private static getFilesFromContainer(container: string): PromiseType<Array<File>> {
        return new Promise((resolve, reject) => {
            this.getContainer(container)
                .then(response => {
                    const files = response.data.data.enfaas_files;

                    /* Get data for all the files, update the file, and return them */
                    const fileDataPromises = files.map(file => this.getFile(file.file_uuid, container));

                    Promise.all(fileDataPromises)
                        .then(responses => {
                            for (let i = 0; i < files.length; i++) {
                                files[i].file_data = responses[i].data;
                            }
                            resolve(files)
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }




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
