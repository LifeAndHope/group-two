import {DatabaseService} from "./databaseService";
import {PromiseType} from "../datatypes/interfaces";


export class UserService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'account';

    protected static configuration: Object = {};

    private static token: string;

    public static isAuthenticated(): boolean {
        return this.token != undefined;
    }

    public static login(username: string, password: string): PromiseType {
        const promise: PromiseType = new Promise((resolve, reject) => {

            super.post('/authenticate', {
                userName: username,
                password: password
            })
                .then(response => {
                    this.token = response.headers.authorization;
                    resolve(response)
                })
                .catch(response => {
                    this.token = undefined;
                    reject(response)
                })
        });

        return promise;
    }

    public static logOut(): PromiseType {
        return super.post('/logout');
    }
}