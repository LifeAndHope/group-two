import {Axios, PromiseType} from './../datatypes/interfaces'

declare var axios:Axios; // Tell typescript that there is a variable called 'axios' in its scope
declare var Cookies;

export class DatabaseService {
    private static directoryName: string = 'default';
    private static customerId: string = 'P88cSuYR';

    protected static authCookieName = "AuthToken";

    static configuration(): Object {
        const cookie = Cookies.get(this.authCookieName);

        if (cookie) {
            const authCookie = JSON.parse(cookie);

            return {
                headers: {
                    "Authorization": authCookie.token
                }
            }
        }

        return {}
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
    protected static post(subpath: string, data: Object, configuration: Object = this.configuration()): PromiseType<any> {
        return axios.post(this.baseUrl() + subpath, data, configuration);
    }

    /**
     * Send a GET request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @param configuration
     * @returns {PromiseType}
     */
    protected static get(subpath: string, configuration: Object = this.configuration()): PromiseType<any> {
        return axios.get(this.baseUrl() + subpath, configuration);
    }

    /**
     * Send a PUT request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @param {Object} [data] Data to be sent
     * @param configuration
 * @returns {PromiseType}
     */
    protected static put(subpath: string, data?: Object, configuration: Object = this.configuration()): PromiseType<any> {
        return axios.put(this.baseUrl() + subpath, data, configuration);
    }

    /**
     * Send a DELETE request to a SecureDB API
     *
     * @param subpath Subpath for the requested service
     * @param data Body data
     * @param configuration
 * @returns {PromiseType}
     */
    protected static delete(subpath: string, data: Object, configuration: Object = this.configuration()): PromiseType<any> {
        /* Axios does not allow a body in DELETE requests by default */
        const deleteConfiguration = configuration;

        deleteConfiguration['data'] = data;
        deleteConfiguration['method'] = 'DELETE';
        deleteConfiguration['url'] = this.baseUrl() + subpath;

        return axios(deleteConfiguration);
    }

    /** Constructs the base URL for the specified API */
    protected static baseUrl(): string {
        return 'https://api.securedb.co:443/securedbapi/' + this.apiName + '/' + this.customerId + '/' + this.directoryName;
    }
}