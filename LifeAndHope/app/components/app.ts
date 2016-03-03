import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';
import {DatabaseService} from "./../services/databaseService";

import {AuthenticatedRouterOutlet} from './authenticatedRouterOutlet';
import {LoginComponent} from './login';


@RouteConfig([
    new Redirect({path: '/', redirectTo: ['/Login'], useAsDefault: true }),
    new Route({path: '/login', component: LoginComponent, name: 'Login'}),
])

@Component({
    selector: 'app',
    templateUrl: 'app/components/views/app.html',
    directives: [RouterLink, AuthenticatedRouterOutlet]
})

export class App {

    title: string;

    constructor() {
        this.title = 'My super title';
    }

}
