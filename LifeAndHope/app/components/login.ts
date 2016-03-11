import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {AccountService} from "../services/account.service";
import {Account} from "../datatypes/interfaces";

@Component({
    selector: 'login',
    templateUrl: 'app/components/views/login.html',
    directives: []
})

export class LoginComponent {

    userForm: ControlGroup;
    failedAuthentication = false;


    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.userForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    loginUser() {
        if (this.userForm.dirty && this.userForm.valid) {
            AccountService.login(this.userForm.value.email, this.userForm.value.password)
                .then((account: Account) => {
                    console.log("Authenticated account:", account);
                    this.router.navigate(["Children"]);
                })
                .catch(error => {
                    console.log("Failed to authenticate account:", error);
                    this.failedAuthentication = true;
                })
        }
    }
}

LoginComponent.parameters = [FormBuilder, Router];