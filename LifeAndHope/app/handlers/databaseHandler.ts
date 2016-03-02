declare var axios:any; // Tell typescript that there is a vaiable called 'axios' in its scope

interface PromiseType {
    (callback: any): void;
}

export class DatabaseHandler {

    accountConnection: any;


    constructor() {
        this.accountConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/account/P88cSuYR/default',
            //headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="}
        });
    }

    login(username, password): PromiseType {
        return this.accountConnection.post("/authenticate", {
            userName: "oyvindkg@yahoo.com",
            password: "Eksperter_1"
        })
    }


}
