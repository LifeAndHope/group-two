import {PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'
import {Container} from "../datatypes/interfaces";
import {SecureDBFile} from "../datatypes/interfaces";
import {SecureDBBlob} from "../datatypes/interfaces";

declare class Promise<T> {
    constructor(Function);
    then(Function): Promise<T>;
    catch(Function): Promise<T>;

    public static all(promises: Array<Promise<any>>): Promise< Array<any> >;
}

export class FileService extends DatabaseService {
    protected static apiName: string = 'files';

    private static imagesPostfix = "images";

    public static getImagesForID(id: string): Promise< Array<SecureDBFile> > {
        const containerName = this.containerNameForID(id, this.imagesPostfix);
        return this.getFilesFromContainer(containerName);
    }

    public static addImageForID(file: File, id: string): Promise<string> {
        const containerName = this.containerNameForID(id, this.imagesPostfix);
        return this.addFileToContainer(file, containerName);
    }

    public static blobAsURL(blob: Blob): string {
        return URL.createObjectURL(blob);
    }



    private static addFileToContainer(file: File, containerName): Promise<string> {
        return new Promise( (resolve, reject) => {
            /* Create the container if it does not exist */
            this.getContainer(containerName)
                .then(() => {
                    this.addFile(file, containerName)
                        .then(resolve)
                        .catch(reject)
                })
                .catch(() => {
                    this.addContainer(containerName)
                        .then(() => {
                            this.addFile(file, containerName)
                                .then(resolve)
                                .catch(reject)
                        })
                        .catch(reject)
                })
        });
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
    private static getFilesFromContainer(containerName: string): Promise< Array<SecureDBFile> > {
        return new Promise<any>((resolve, reject) => {
            this.getContainer(containerName)

                .then(container => {
                    if (!container.enfaas_files) {
                        return resolve([]);
                    }

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


    private static addContainer(container: string): Promise<void> {
        return new Promise( (resolve, reject) => {
            super.post('', {'container_name': container})
                .then(response => resolve())
                .catch(reject)
        });
    }

    private static addFile(file: File, container: string): Promise<string> {
        return new Promise( (resolve, reject) => {
            const name = file.name.split(".")[0];
            if (name !== FileService.secureDBName(name)) {
                return reject("File name cannot contain special characters (" + name + ")");
            }

            let formData = new FormData();
            formData.append('file', file);

            return super.post('/' + container + '/file', formData)
                .then(response => resolve(response.data.data))
                .catch(reject)
        });

    }


    private static getContainer(container: string): Promise<Container> {
        return new Promise( (resolve, reject) => {
            super.get('/' + container)
                .then(response => {
                    resolve(<Container> response.data.data);
                })
                .catch(reject);
        });
    }

    private static getFile(id: string, container: string): Promise<SecureDBBlob> {
        return new Promise((resolve, reject) => {
            super.get('/' + container + '/file/' + id, this.fileConfiguration())
                .then(response => {
                    response.data.uuid = id;
                    resolve(response.data);
                })
                .catch(reject)
        });
    }


    /** Configuration defining response type for files */
    private static fileConfiguration() {
        let configuration = super.configuration();

        configuration['responseType'] = 'blob';

        return configuration;
    }

    /**
     * Create a valid SecureDB name from a string
     * They do not accept special characters or uppercase characters
     */

    private static secureDBName(name: String): string {
        return name.toLowerCase().replace(/[ -.!:@]/ig, "");
    }

    /**
     * Create a valid SecureDB container name from a string
     * They do not accept special characters, uppercase characters, or names longer than 32
     */

    private static containerNameForID(id: string, postfix: string): string {
        const name = this.secureDBName(id + postfix);
        return name.substr( Math.max(0, name.length-32) );
    }
}
