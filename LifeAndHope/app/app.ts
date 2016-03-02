import {Component, View} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {DatabaseHandler} from "./handlers/databaseHandler";

import {LoginComponent} from './login';


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
    }

}
