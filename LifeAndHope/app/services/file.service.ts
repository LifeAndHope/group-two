import {PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'
import {Container} from "../datatypes/interfaces";
import {SecureDBFile} from "../datatypes/interfaces";
import {SecureDBBlob} from "../datatypes/interfaces";


export class FileService extends DatabaseService {
    protected static apiName: string = 'files';


    public static getImagesForChild(id: string): PromiseType< Array<SecureDBFile> > {
        return this.getFilesFromContainer('uuid_images')
    }


    /**
     * Retrieve all files from a container.
     * The file data is represented in binary and encoded as base64
     *
     * @param containerName
     *
     * @returns {Promise}
     */

    //TODO: Maybe this should support filtering files retrieved?
    private static getFilesFromContainer(containerName: string): PromiseType< Array<SecureDBFile> > {
        return new Promise((resolve, reject) => {
            this.getContainer(containerName)

                .then(container => {
                    const fileDescriptions = container.enfaas_files;

                    /* Get data for all the files, update the file, and return them */
                    const filePromises = fileDescriptions.map(fileDescription => this.getFile(fileDescription.file_uuid, container.container_name));

                    Promise.all(filePromises)
                        .then(blobs => {
                            let files: Array<SecureDBFile> = [];
                            for (let i = 0; i < blobs.length; i++) {
                                let file = blobs[i];
                                file.lastModifiedDate = new Date(fileDescriptions[i].file_lastmodified);
                                file.name = fileDescriptions[i].file_name;
                                files.push(file);
                            }
                            resolve(files)
                        })
                        .catch(reject);
                })

                .catch(reject);
        });
    }


    public static addContainer(container: string): PromiseType<any> {
        return super.post('', {
            'container_name': container
        });
    }

    public static addFile(file: File, container: string): PromiseType<any> {
        let formData = new FormData();
        formData.append('file', file);

        return super.post('/' + container + '/file', formData);
    }


    public static getContainer(container: string): PromiseType<Container> {
        return new Promise( (resolve, reject) => {
            super.get('/' + container)
                .then(response => {
                    resolve(<Container> response.data.data);
                })
                .catch(reject);
        });
    }

    public static getFile(id: string, container: string): PromiseType<SecureDBBlob> {
        return new Promise( (resolve, reject) => {
            super.get('/' + container + '/file/' + id, this.fileConfiguration())
                .then(response => {
                    response.data.uuid = id;
                    resolve(response.data);
                })
                .catch(reject)
        });
    }


    public static fileAsURL(file: File): string {
        return URL.createObjectURL(file);
    }

    /** Configuration defining response type for files */
    private static fileConfiguration() {
        let configuration = super.configuration();

        configuration['responseType'] = 'blob';

        return configuration;
    }

}
