var DatabaseHandler = (function () {
    function DatabaseHandler() {
        this.accountConnection = axios.create({
            baseURL: 'https://api.securedb.co:443/securedbapi/account/P88cSuYR/default'
        });
    }
    DatabaseHandler.prototype.login = function (username, password) {
        return this.accountConnection.post("/authenticate", {
            userName: "oyvindkg@yahoo.com",
            password: "Eksperter_1"
        });
    };
    return DatabaseHandler;
})();
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=databaseHandler.js.map