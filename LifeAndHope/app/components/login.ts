import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {AccountService} from "../services/account.service";
import {Account} from "../datatypes/interfaces";
import {IconComponent} from "./icon";

@Component({
    selector: 'login',
    templateUrl: 'app/components/views/login.html',
    directives: [IconComponent]
})

export class LoginComponent {

    userForm: ControlGroup;
    failedAuthentication = false;
    signingIn = false;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.userForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    loginUser() {
        if (this.userForm.valid) {
            this.signingIn = true;

            AccountService.login(this.userForm.value.email, this.userForm.value.password)
                .then((account: Account) => {
                    console.log("Authenticated account:", account);
                    this.router.navigate(["Children"]);
                    this.signingIn = false;
                })
                .catch(error => {
                    console.log("Failed to authenticate account:", error);
                    this.failedAuthentication = true;
                    this.signingIn = false;
                })
        }
    }
}

LoginComponent.parameters = [FormBuilder, Router];