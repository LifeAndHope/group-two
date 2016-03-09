var DatabaseHandler = (function () {
    function DatabaseHandler() {
        this.accountConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/account/P88cSuYR/default'
        });
        this.dataConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/data/P88cSuYR/default',
            headers: { "Authorization": "Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU=" } //TODO: change to JWT?
        });
    }
    DatabaseHandler.prototype.login = function (username, password) {
        return this.accountConnection.post("/authenticate", {
            userName: "oyvindkg@yahoo.com",
            password: "Eksperter_1"
        });
    };
    DatabaseHandler.prototype.getTables = function () {
        this.dataConnection.get('/tables').then(function (response) {
            var data = response.data.data;
            data.forEach(function (item) {
                console.log('<p>' + item.name + '</p>');
            });
        }).catch(function (response) {
            //TODO: catch exceptions?
        });
    };
    DatabaseHandler.prototype.getChildren = function () {
        return this.dataConnection.get('/child?fields=*');
    };
    DatabaseHandler.prototype.getSponsor = function () {
        return this.dataConnection.get('/sponsor?fields=*');
    };
    return DatabaseHandler;
})();
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=databaseHandler.js.map