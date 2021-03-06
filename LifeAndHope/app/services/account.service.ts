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

        const authCookie = Cookies.get(this.authCookieName);
        if (!authCookie) {
            return false;
        }

        return true;
    }


    public static login(username: string, password: string): PromiseType<Account> {
        this.deauthorizeAccount();

        return new Promise((resolve, reject) => {

            const loginPromise = axios.post('https://oyvindkg.pythonanywhere.com/authenticate', {
                userName: username,
                password: password
            });

            /* Successful authentication */
            loginPromise.then(response => {

                /* Expire after 8 hours */
                let expiryDate = new Date();
                const hoursToLive = 8;
                expiryDate.setTime(expiryDate.getTime() + (hoursToLive * 60 * 60 * 1000));

                Cookies.set(this.authCookieName, response.data.data, {expires: expiryDate, path: '/'});

                /* Retrieve the authenticated user */
                this.updateAuthenticatedAccount()
                    .then(resolve)
                    .catch(error => {
                        this.deauthorizeAccount();
                        reject(error);
                    })
            });

            /* Failed to authenticate */
            loginPromise.catch(response => {
                this.deauthorizeAccount();
                reject(response)
            });
        });
    }

    public static updateAuthenticatedAccount(): PromiseType<Account> {
        const authCookie = JSON.parse(Cookies.get(this.authCookieName));

        return new Promise((resolve, reject) => {
            this.getAccount(authCookie.uuid)
                .then((account: Account) => {
                    this.authenticatedAccount = account;
                    resolve(account);
                })
                .catch(error => {
                    reject(error);
                });

        });
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
            });

            signOutPromise.catch(reject);
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