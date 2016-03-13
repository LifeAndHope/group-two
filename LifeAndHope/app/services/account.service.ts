import {DatabaseService} from "./database.service";
import {PromiseType} from "../datatypes/interfaces";
import {Account} from "../datatypes/interfaces";

declare var Cookies;

export class AccountService extends DatabaseService {

    protected static apiName: string = 'account';

    public static authenticatedAccount: Account;

    public static isAuthenticated(): boolean {
        if (this.authenticatedAccount) {
            return true;
        }

        return Cookies.get(this.authCookieName) != undefined;
    }


    public static login(username: string, password: string): PromiseType<Account> {
        this.deauthorizeAccount();

        const promise: PromiseType<Account> = new Promise((resolve, reject) => {

            const loginPromise = axios.post('https://oyvindkg.pythonanywhere.com/authenticate', {
                userName: username,
                password: password
            });

            /* Successful authentication */
            loginPromise.then(response => {
                console.log("New token:", response.data.data.token);
                Cookies.set(this.authCookieName, response.data.data.token, {expires: 1, path: '/'});

                /* Retrieve the authenticated user */
                this.getAccount(response.data.data.uuid)
                .then((account: Account) => {
                    this.authenticatedAccount = account;
                    resolve(account);
                })
                .catch(error => {
                    this.deauthorizeAccount();
                    reject(error);
                });
            });

            /* Failed to authenticate */
            loginPromise.catch(response => {
                this.deauthorizeAccount();
                reject(response)
            });
        });

        return promise;
    }

    private static deauthorizeAccount() {
        this.authenticatedAccount = undefined;
        Cookies.remove(this.authCookieName, {path: '/'});
    }

    public static signOut(): PromiseType<any> {
        return new Promise((resolve, reject) => {
            const signOutPromise = super.post('/logout', {});

            signOutPromise.then(response => {
                this.deauthorizeAccount();
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