import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';

import {AuthenticatedRouterOutlet} from './authenticatedRouterOutlet';

import {LoginComponent} from './login';
import {HovedsideComponent} from "./Hovedside";




@RouteConfig([
    new Redirect({path: '/', redirectTo: ['/Login'], useAsDefault: true }),
    new Route({path: '/login', component: LoginComponent, name: 'Login'}),
    new Route({path: '/hovedside', component: HovedsideComponent, name: 'Hovedside'}),
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
