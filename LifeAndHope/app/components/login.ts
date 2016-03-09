import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';

@Component({
    selector: 'login',
    templateUrl: 'app/components/views/login.html',
    directives: []
})

export class LoginComponent {
    // Do fancy stuff
    loginFunction(){
        //new DatabaseService().login(username,password)

    }


}