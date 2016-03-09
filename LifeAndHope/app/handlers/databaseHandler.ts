declare var axios:any; // Tell typescript that there is a vaiable called 'axios' in its scope

interface PromiseType {
    (callback: any): void;
}

export class DatabaseHandler {

    accountConnection: any;
    dataConnection : any;
    fileConnection : any;


    constructor() {
        this.accountConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/account/P88cSuYR/default',
                //headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="}
        });

        this.dataConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/data/P88cSuYR/default',
            headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="} //TODO: change to JWT?
        });

        this.fileConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/files/P88cSuYR/default',
            headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="}
        });
    }

    login(username, password): PromiseType {
        return this.accountConnection.post("/authenticate", {
            userName: "oyvindkg@yahoo.com",
            password: "Eksperter_1"
        })
    }
    getTables(){
        this.dataConnection.get('/tables').then(function (response) {
            var data : any = response.data.data;
            data.forEach(function (item) {
                console.log('<p>' + item.name + '</p>');
            })
        }).catch(function (response) {
            //TODO: catch exceptions?
        });
    }

    getChildren() : any{
        return this.dataConnection.get('/child?fields=*')
    }

    getSponsor() : any{
        return this.dataConnection.get('/sponsor?fields=*')
    }

    getNote(tableName : string, instanceId : string) : any{
        let requestUrl = '/note?fields=*&filters=table_name%3D\''+ tableName +'\'%20AND%20instance_id%3D\''+ instanceId +'\'&&&'

        return this.dataConnection.get(requestUrl)
    }

    getNotesFromChild(childId : string){
        return this.getNote('child', childId);
    }

}
