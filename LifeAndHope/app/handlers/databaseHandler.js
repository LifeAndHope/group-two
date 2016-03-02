/* Enums */
var Table;
(function (Table) {
    Table[Table["Sponsor"] = 0] = "Sponsor";
    Table[Table["Child"] = 1] = "Child";
    Table[Table["Note"] = 2] = "Note";
    Table[Table["File"] = 3] = "File";
})(Table || (Table = {}));
/* Implementation */
var DatabaseHandler = (function () {
    function DatabaseHandler() {
        this.accountConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/account/P88cSuYR/default',
            headers: { "Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU=" }
        });
        this.dataConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/data/P88cSuYR/default',
            headers: { "Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU=" }
        });
        this.fileConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/file/P88cSuYR/default',
            headers: { "Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU=" }
        });
    }
    /* Authenticate user */
    DatabaseHandler.prototype.login = function (username, password) {
        return this.accountConnection.post("/authenticate", {
            userName: username,
            password: password
        });
    };
    /* Add data to database */
    DatabaseHandler.prototype.addChild = function (child) {
        child.id = uuid.v4();
        return this.addDataToTable(child, DatabaseHandler.tableNameForTable(Table.Child));
    };
    DatabaseHandler.prototype.addSponsor = function (sponsor) {
        sponsor.id = uuid.v4();
        return this.addDataToTable(sponsor, DatabaseHandler.tableNameForTable(Table.Sponsor));
    };
    DatabaseHandler.prototype.addDataToTable = function (data, tableName) {
        return this.addDataArrayToTable([data], tableName);
    };
    DatabaseHandler.prototype.addDataArrayToTable = function (dataArray, tableName) {
        console.log("Add data:", dataArray);
        return this.dataConnection.post("/" + tableName, dataArray);
    };
    /* Helpers */
    DatabaseHandler.tableNameForTable = function (table) {
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
    };
    return DatabaseHandler;
})();
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=databaseHandler.js.map