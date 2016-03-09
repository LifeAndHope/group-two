import {DatabaseService} from "./database.service";
import {PromiseType} from "../datatypes/interfaces";
import {Account} from "../datatypes/interfaces";


export class AccountService extends DatabaseService {

    protected static apiName: string = 'account';
    protected static configuration: Object = {};


    public static authenticatedAccount: Account;



    public static isAuthenticated(): boolean {
        return this.authenticatedAccount != undefined;
    }

    public static login(username: string, password: string): PromiseType<Account> {
        const promise: PromiseType<Account> = new Promise((resolve, reject) => {

            const loginPromise = super.post('/authenticate', {
                userName: username,
                password: password
            });

            /* Successful authentication */
            loginPromise.then(response => {

                /* Update the headers configuration */
                this.configuration = {
                    headers: {
                        Authorization: response.headers.authorization
                    }
                };

                /* Retrieve the authenticated user */
                const userPromise = this.getAccount(response.data.data);

                userPromise.then((account: Account) => {
                    this.authenticatedAccount = account;
                    resolve(account);
                });

                userPromise.catch(error => {
                    this.deauthorizeAccount();
                    reject(error);
                });
            });

            /* Failed to authenticate */
            loginPromise.catch(response => {
                this.deauthorizeAccount()
                reject(response)
            });
        });

        return promise;
    }

    private static deauthorizeAccount() {
        this.authenticatedAccount = undefined;
        this.configuration = {};
    }

    public static signOut(): PromiseType<any> {
        return new Promise((resolve, reject) => {
            const signOutPromise = super.post('/logout', {});

            signOutPromise.then(response => {
                this.deauthorizeAccount()
                resolve(response);
            })

            signOutPromise.catch(response => {
                reject(response);
            })
        })

    }

    public static getAccount(uuid: string): PromiseType<Account> {
        return new Promise((resolve, reject) => {
            const userPromise = super.get('/uuid/' + uuid);

            userPromise.then(response => {
                resolve(response.data.data);
            });

            userPromise.catch(response => {
                reject(response.data);
            });
        });
    }
}