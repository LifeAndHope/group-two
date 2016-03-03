import {Component, View} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {DatabaseService} from "./../services/databaseService";

import {LoginComponent} from './login';


@RouteConfig([
    {path: '/', component: LoginComponent, name: 'Login'},
    {path: '/test', component: LoginComponent, name: 'Test'},
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
