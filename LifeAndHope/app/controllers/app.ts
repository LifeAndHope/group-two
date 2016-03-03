import {Component, View} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router, Route, Redirect } from 'angular2/router';
import {DatabaseService} from "./../services/databaseService";

import {LoginComponent} from './login';


@RouteConfig([
    new Redirect({path: '/', redirectTo: ['/Login'] }),
    new Route({path: '/login', component: LoginComponent, name: 'Login'})
])

@Component({
    selector: 'app',
    templateUrl: 'app/views/app.html',
    directives: [ROUTER_DIRECTIVES]
})


export class App {

    title: string;

    constructor() {
        this.title = 'My super title';
    }

}
