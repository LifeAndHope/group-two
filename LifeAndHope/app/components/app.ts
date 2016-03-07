import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';

import {AuthenticatedRouterOutlet} from './authenticatedRouterOutlet';

import {LoginComponent} from './login';
import {ListComponent} from "./list";


@RouteConfig([
    new Redirect({path: '/', redirectTo: ['/List'], useAsDefault: true }),
    new Route({path: '/login', component: LoginComponent, name: 'Login'}),
    new Route({path: '/list', component: ListComponent, name: 'List'})
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
