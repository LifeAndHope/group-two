import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';

import {AuthenticatedRouterOutlet} from './authenticated.router.outlet';

import {LoginComponent} from './login';

import {ChildrenComponent} from "./children";
import {AccountService} from "../services/account.service";
import {ObjectDataComponent} from "./object.data";
import {InfoBoxComponent} from "./info.box";




@RouteConfig([
    new Redirect({path: '/', redirectTo: ['Children'], useAsDefault: true }),
    new Route({path: '/signin', component: LoginComponent, name: 'SignIn'}),
    new Route({path: '/children', component: ChildrenComponent, name: 'Children'}),
])

@Component({
    selector: 'app',
    templateUrl: 'app/components/views/app.html',
    directives: [RouterLink, AuthenticatedRouterOutlet, ObjectDataComponent],
})

export class App {

    signingOut = false;

    constructor(private router: Router) {}

    signOut() {
        this.signingOut = true;
        AccountService.signOut()
            .then(response => {
                this.router.navigate(['SignIn']);
                this.signingOut = false;
            })
            .catch(response => {
                alert("Failed to sign out");
                this.signingOut = false;
            });
    }

    isAuthenticated(): boolean {
        return AccountService.isAuthenticated();
    }
}

App.parameters = [Router];
