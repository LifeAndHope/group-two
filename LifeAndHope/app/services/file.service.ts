import {DatabaseService} from './database.service'
import {Container} from "../datatypes/interfaces";
import {SecureDBFile, SecureDBBlob} from "../datatypes/interfaces";
//import {Promise} from "../datatypes/models"; //FIXME: This causes an error at runtime

export class FileService extends DatabaseService {
    protected static apiName: string = 'files';

    private static imagesPostfix = "images";

    private static hexlist = '0123456789abcdef';
    private static b36list = 'abcdefghijklmnopqrstuvwxyz0123456789';

    public static getImagesForID(id: string): Promise< Array<SecureDBFile> > {
        const containerName = this.containerNameForID(id, this.imagesPostfix);
        return this.getFilesFromContainer(containerName);
    }

    public static addImageForID(file: File, id: string): Promise<string> {
        const containerName = this.containerNameForID(id, this.imagesPostfix);
        return this.addFileToContainer(file, containerName);
    }

    /**
     * Create a URL from a blob. The URL can be used as the source of an img-tag etc.
     *
     * @param blob A blob containing raw data
     * @returns {string} The URL
     */
    public static blobAsURL(blob: Blob): string {
        return URL.createObjectURL(blob);
    }


    /**
     * Add the file to the container. If the container does not exist, it will be created
     * @param file The file to be added
     * @param containerName The container the file will be added to
     * @returns {Promise} A promise providing the SecureDB UUID of the added file
     */
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
     * If the container does not exist, an empty array is returned
     *
     * @param containerName
     *
     * @returns {Promise} A promise providing an array of files
     */

    private static getFilesFromContainer(containerName: string): Promise< Array<SecureDBFile> > {
        return new Promise<any>( (resolve, reject) => {
            this.getContainer(containerName)

                .then(container => {
                    /* The container exists, but does not contain any files */
                    if (!container.enfaas_files) {
                        return resolve([]);
                    }

                    /* Get data for all the files, update the file, and return them */
                    const fileDescriptions = container.enfaas_files;
                    const filePromises = fileDescriptions.map(fileDescription => this.getFile(fileDescription.file_uuid, container.container_name));

                    /* Wait for all the promises  to complete, then update the blobs with a name and last modified date */
                    Promise.all(filePromises)
                        .then(blobs => {
                            let files: Array<SecureDBFile> = [];
                            for (let i = 0; i < blobs.length; i++) {
                                let file: SecureDBFile = blobs[i];
                                file.lastModifiedDate = new Date(fileDescriptions[i].file_lastmodified);
                                file.name = fileDescriptions[i].file_name;
                                files.push(file);
                            }
                            resolve(files)
                        })
                        .catch(reject);
                })

                .catch(response => {
                    /* The container does not exist */
                    if (response.status === 404) {
                        return resolve([])
                    }

                    /* Something else went wrong */
                    reject(response);
                });
        });
    }

    /**
     * Add a new container
     *
     * @param containerName
     *
     * @returns {Promise} An empty promise
     */
    private static addContainer(containerName: string): Promise<any> {
        return new Promise( (resolve, reject) => {
            super.post('', {'container_name': containerName})
                .then(response => resolve())
                .catch(reject)
        });
    }

    /**
     * Add the file to the container
     *
     * @param file The file to be added
     * @param containerName The target container name
     * @returns {Promise} A promise providing the UUID received from SecureDB if successful
     */
    private static addFile(file: File, containerName: string): Promise<string> {
        return new Promise( (resolve, reject) => {

            const name = file.name.split(".")[0];
            if (name !== FileService.secureDBName(name)) {
                return reject("File name cannot contain special characters (" + name + ")");
            }

            let formData = new FormData();
            formData.append('file', file);

            return super.post('/' + containerName + '/file', formData)
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
        const name = this.uuidToBase36(id) + postfix;
        return name.substr( Math.max(0, name.length-32) );
    }

    private static uuidToBase36(uuid: string) : string{
        let s = uuid.replace(/[^0-9a-f]/ig,'').toLowerCase();
        if (s.length != 32) return '';

        s += '0';

        let a, p, q;
        let r = '';
        let i = 0;
        while (i < 33) {
            a =  (this.hexlist.indexOf(s.charAt(i++)) << 8) |
                (this.hexlist.indexOf(s.charAt(i++)) << 4) |
                (this.hexlist.indexOf(s.charAt(i++)));

            p = a >> 7;
            q = a & 35;

            r += this.b36list.charAt(p) + this.b36list.charAt(q);
        }

        return r;
    }
}