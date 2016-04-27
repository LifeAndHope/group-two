import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';

import {AuthenticatedRouterOutlet} from './../directives/authenticatedRouterOutlet.directive';

import {AccountService} from "../services/account.service";

import {LoginComponent} from './login';

import {ChildrenComponent} from "./children";
import {InfoBoxComponent} from "./info.box";
import {ChildComponent} from "./child";
import {SponsorComponent} from "./sponsor";
import {SponsorsComponent} from "./sponsors";




@RouteConfig([
    new Redirect({path: '/', redirectTo: ['Children'], useAsDefault: true }),
    new Route({path: '/signin', component: LoginComponent, name: 'SignIn'}),
    new Route({path: '/children', component: ChildrenComponent, name: 'Children'}),
    new Route({path: '/children/:id', component: ChildComponent, name: 'Child'}),
    new Route({path: '/sponsors', component: SponsorsComponent, name: 'Sponsors'}),
    new Route({path: '/sponsors/:id', component: SponsorComponent, name: 'Sponsor'})
])

@Component({
    selector: 'app',
    templateUrl: 'app/components/views/app.html',
    directives: [RouterLink, AuthenticatedRouterOutlet],
})

export class App {

    signingOut = false;

    constructor(private router: Router) {}

    signOut() {
        this.signingOut = true;
        AccountService.signOut()
            .then(() => {
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
