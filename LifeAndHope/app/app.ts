import {Component, View} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import {LoginComponent} from './login';
import {DatabaseHandler} from "./handlers/databaseHandler";

@RouteConfig([
    {path: '/', component: LoginComponent, name: 'Login'},
])

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES]
})


export class App {

    title: string;

    constructor() {
        this.title = 'My super title';

        new DatabaseHandler().login('oyvindkg', 'password').then(function (response) {
                console.log("SUCCESS:");
                console.log(response);
                alert(response.headers["authorization"]);
            })
            .catch(function (response) {
                console.log("ERROR:");
                console.log(response);
            })
    }

}
