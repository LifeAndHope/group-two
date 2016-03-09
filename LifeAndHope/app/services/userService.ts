import {DatabaseService} from "./databaseService";
import {PromiseType} from "../datatypes/interfaces";


export class UserService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'account';

    protected static configuration: Object = {};

    private token: string;

    public static isAuthenticated(): boolean {
        return
    }

    public static login(username: string, password: string): PromiseType {
        return super.post('/authenticate', {
            username: username,
            password: password
        });
    }

    public static logOut(): PromiseType {
        return super.post('/logout');
    }
}