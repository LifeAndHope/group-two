import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';

import {AuthenticatedRouterOutlet} from './authenticated.router.outlet';

import {LoginComponent} from './login';
import {ListComponent} from "./list";

import {HovedsideComponent} from "./Hovedside";
import {AccountService} from "../services/account.service";
import {ObjectDataComponent} from "./object.data";
import {DataService} from "../services/data.service";
import {Row} from "./object.data";




@RouteConfig([
    new Redirect({path: '/', redirectTo: ['Children'], useAsDefault: true }),
    new Route({path: '/signin', component: LoginComponent, name: 'SignIn'}),
    new Route({path: '/children', component: HovedsideComponent, name: 'Children'}),
    new Route({path: '/children/:id', component: ObjectDataComponent, name: 'Child'}),
])

@Component({
    selector: 'app',
    templateUrl: 'app/components/views/app.html',
    directives: [RouterLink, AuthenticatedRouterOutlet, ObjectDataComponent]
})

export class App {

    title: string;

    constructor(private router: Router) {
        this.title = 'My super title';
    }

    signOut() {
        AccountService.signOut()
            .then(response => this.router.navigate(['SignIn']))
            .catch(response => alert("Failed to sign out"));
    }

    isAuthenticated(): boolean {
        return AccountService.isAuthenticated();
    }
}

App.parameters = [Router];
