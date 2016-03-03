import {Sponsor, Child} from './../datatypes/models'
import {Axios, UUIDGenerator, PromiseType} from './../datatypes/interfaces'

declare var axios:Axios; // Tell typescript that there is a variable called 'axios' in its scope
declare var uuid:UUIDGenerator; // Tell typescript that there is a variable called 'uuid' in its scope


/** Represents the tables in our SecureDB backend */
enum Table { Sponsor, Child, Note, File }

/** The various APIs SecureDB offers */
enum SecureDBAPI { Account, Data, File }


/** Responsible for all communication with the database */
export class DatabaseService {

    private static directoryName: string = 'default';
    private static customerID: string = 'P88cSuYR';

    private static  configuration = {
        headers: {
            "Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="
        }
    };


    //TODO: Create a separate class for user management?
    /** Authenticate a user
     *
     * @param username The username
     * @param password The password
     * @returns {PromiseType}
     */
    static login(username, password): PromiseType {
        var baseURL: string = this.baseURLForSecureDBAPI(SecureDBAPI.Account);
        return this.post(SecureDBAPI.Account, "/authenticate", {
            userName: username,
            password: password
        })
    }


    /* Get data from database */

    static getTables(){
        this.get(SecureDBAPI.Data, '/tables').then(function (response) {
            var data : any = response.data.data;
            data.forEach(function (item) {
                console.log('<p>' + item.name + '</p>');
            })
        }).catch(function (response) {
            //TODO: catch exceptions?
        });
    }

    static getChildren(): PromiseType {
        return this.get(SecureDBAPI.Data, '/child?fields=*');
    }


    /* Add data to database */

    /** Add a new child to the database. An UUID will be generated and assigned before the request is sent.
     *
     * @param {Child} child Child to be added to the database
     * @returns {PromiseType}
     */
    static addChild(child: Child): PromiseType {
        child.id = uuid.v4();
        return this.addDataToTable([child], DatabaseService.tableNameForTable( Table.Child ));
    }

    /** Add a new sponsor to the database. An UUID will be generated and assigned before the request is sent.
     *
     * @param {Sponsor} sponsor Sponsor to be added to the database
     * @returns {PromiseType}
     */
    static addSponsor(sponsor: Sponsor): PromiseType {
        sponsor.id = uuid.v4();
        return this.addDataToTable([sponsor], DatabaseService.tableNameForTable( Table.Sponsor ));
    }

    private static addDataToTable( data: Object, tableName: string ): PromiseType {
        return this.post( SecureDBAPI.Data, "/" + tableName, data );
    }


    /* Base request methods */

    /** Send a POST request to a SequreDBAPI
     *
     * @param api Target API
     * @param subpath Subpath for the requested service
     * @param {Object} data Data to be sent
     * @returns {PromiseType}
     */
    private static post(api: SecureDBAPI, subpath: string, data: Object): PromiseType {
        return this.dispatchRequest(axios.post, api, subpath, data);
    }

    /** Send a GET request to a SequreDBAPI
     *
     * @param api Target API
     * @param subpath Subpath for the requested service
     * @param {Object} [data] Data to be sent
     * @returns {PromiseType}
     */
    private static get(api: SecureDBAPI, subpath: string, data?: Object): PromiseType {
        return this.dispatchRequest(axios.get, api, subpath, data);
    }

    /** Send a PUT request to a SequreDBAPI
     *
     * @param api Target API
     * @param subpath Subpath for the requested service
     * @param {Object} [data] Data to be sent
     * @returns {PromiseType}
     */
    private static put(api: SecureDBAPI, subpath: string, data?: Object): PromiseType {
        return this.dispatchRequest(axios.put, api, subpath, data);
    }

    /** The base method responsible for actually dispatching the request
     *
     * @param {(url: string, data?: any, configuration?: any) => PromiseType} requestFunction An Axios method representing the desired HTTP method
     * @param {SecureDBAPI} API The targeted SecureDB API
     * @param {string} subpath Subpath from the base URL of the specified API
     * @param {Object} [data] The data to be sent
     * @returns {PromiseType}
     */
    private static dispatchRequest(requestFunction: (url: string, data?: Object, configuration?: Object) => PromiseType,
                                   API: SecureDBAPI,
                                   subpath: string,
                                   data?: Object): PromiseType {

        var baseURL: string = DatabaseService.baseURLForSecureDBAPI(API);
        return requestFunction(baseURL + subpath, data, this.configuration);
    }


    /* Helpers */

    private static tableNameForTable(table: Table): string {
        switch (table) {
            case Table.Child:
                return 'child';
            case Table.Sponsor:
                return 'sponsor';
            case Table.Note:
                return 'note';
            case Table.File:
                return 'file';
            default:
                throw new Error();
        }
    }

    private static baseURLForSecureDBAPI(api): string {
        var apiName: string;

        switch (api) {
            case SecureDBAPI.Account:
                apiName = 'account';
                break;
            case SecureDBAPI.Data:
                apiName = 'data';
                break;
            case SecureDBAPI.File:
                apiName = 'file';
                break;
            default:
                throw new Error();
        }

        return 'https://api.securedb.co:443/securedbapi/' + apiName + '/' + this.customerID + '/' + this.directoryName;
    }
}
