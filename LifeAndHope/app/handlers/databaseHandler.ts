import {Sponsor, Child} from './models'

declare var axios:any; // Tell typescript that there is a variable called 'axios' in its scope
declare var uuid:any; // Tell typescript that there is a variable called 'uuid' in its scope

/* Interfaces */

// TODO: Create interfaces for various data types :)

interface PromiseType {
    then(callback: any): PromiseType;
    catch(callback: any): PromiseType;
}

/* Enums */

enum Table { Sponsor, Child, Note, File }


/* Implementation */

export class DatabaseHandler {

    private accountConnection: any;
    private dataConnection: any;
    private fileConnection: any;


    constructor() {
        this.accountConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/account/P88cSuYR/default',
            headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="}
        });

        this.dataConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/data/P88cSuYR/default',
            headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="}
        });

        this.fileConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/file/P88cSuYR/default',
            headers: {"Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU="}
        });
    }


    /* Authenticate user */

    login(username, password): PromiseType {
        return this.accountConnection.post("/authenticate", {
            userName: username,
            password: password
        })
    }


    /* Add data to database */

    addChild(child: Child): PromiseType {
        child.id = uuid.v4();
        return this.addDataToTable(child, DatabaseHandler.tableNameForTable( Table.Child ));
    }

    addSponsor(sponsor: Sponsor): PromiseType {
        sponsor.id = uuid.v4();
        return this.addDataToTable(sponsor, DatabaseHandler.tableNameForTable( Table.Sponsor ));
    }

    private addDataToTable( data: any, tableName: string ): PromiseType {
        return this.addDataArrayToTable( [data], tableName );
    }

    private addDataArrayToTable( dataArray: any[], tableName: string ): PromiseType {
        console.log("Add data:", dataArray);
        return this.dataConnection.post( "/" + tableName, dataArray );
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
}
