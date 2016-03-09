import {Axios, PromiseType} from './../datatypes/interfaces'

declare var axios:Axios; // Tell typescript that there is a variable called 'axios' in its scope


export class DatabaseService {
    private static directoryName: string = 'default';
    private static customerId: string = 'P88cSuYR';

    protected static configuration: Object = {
        headers: {
            "Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="
        }
    };

    /** Name of the api. Override this in your subclass */
    protected static apiName: string = 'override me';


    /**
     * Send a POST request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @param {Object} data Data to be sent
     * @returns {PromiseType}
     */
    protected static post(subpath: string, data: Object): PromiseType {
        return axios.post(this.baseUrl() + subpath, data, this.configuration);
    }

    /**
     * Send a GET request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @returns {PromiseType}
     */
    protected static get(subpath: string): PromiseType {
        return axios.get(this.baseUrl() + subpath, this.configuration);
    }

    /**
     * Send a PUT request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @param {Object} [data] Data to be sent
     * @returns {PromiseType}
     */
    protected static put(subpath: string, data?: Object): PromiseType {
        return axios.put(this.baseUrl() + subpath, data, this.configuration);
    }

    /**
     * Send a DELETE request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @returns {PromiseType}
     */
    protected static delete(subpath: string): PromiseType {
        return axios.delete(this.baseUrl() + subpath, this.configuration);
    }

    /** Constructs the base URL for the specified API */
    private static baseUrl(): string {
        return 'https://api.securedb.co:443/securedbapi/' + this.apiName + '/' + this.customerId + '/' + this.directoryName;
    }
}