var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var login_1 = require('./login');
var databaseHandler_1 = require("./handlers/databaseHandler");
var App = (function () {
    function App() {
        this.title = 'My super title';
        /*new DatabaseHandler().login('oyvindkg', 'password').then(function (response) {
                console.log("SUCCESS:");
                console.log(response);
                alert(response.headers["authorization"]);
            })
            .catch(function (response) {
                console.log("ERROR:");
                console.log(response);
            })*/
        new databaseHandler_1.DatabaseHandler().getTables();
        new databaseHandler_1.DatabaseHandler().getChildren()
            .then(function (response) {
            console.log(response);
        })
            .catch(function (response) {
            console.log(response);
        });
    }
    App = __decorate([
        router_1.RouteConfig([
            { path: '/', component: login_1.LoginComponent, name: 'Login' },
        ]),
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        })
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map