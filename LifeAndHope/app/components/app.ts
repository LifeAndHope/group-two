import {Component, View} from 'angular2/core';
import { RouteConfig, RouterLink, Router, Route, Redirect } from 'angular2/router';

import {AuthenticatedRouterOutlet} from './authenticatedRouterOutlet';

import {LoginComponent} from './login';
import {DatabaseHandler} from "../handlers/databaseHandler";


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

        new DatabaseHandler().getTables();

        new DatabaseHandler().getChildren()
            .then(function (response){
                console.log(response);
            })
            .catch(function (response){
                console.log(response);
            });

        new DatabaseHandler().getSponsor()
            .then(function(response){
                console.log(response)
            })
            .catch(function(response){
                console.log(response)
            })

        new DatabaseHandler().getNotesFromChild("53301ea9-d9bb-4271-9342-c9377c2f267c")
    }
}
