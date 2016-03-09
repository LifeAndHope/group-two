import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {FormBuilder, Validators} from 'angular2/common';
import {UserService} from "../services/userService";

@Component({
    selector: 'login',
    templateUrl: 'app/components/views/login.html',
    directives: []
})

export class LoginComponent {
    userForm: any;

    constructor(private _formBuilder: FormBuilder) {
        this.userForm = this._formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    loginUser() {
        if (this.userForm.dirty && this.userForm.valid) {
            alert(`username: ${this.userForm.value.username} password: ${this.userForm.value.password}`);
            UserService.login(this.userForm.value.username, this.userForm.value.password)
                .then(response => {
                    console.log(response);
                })
                .catch(response => {
                    console.log(response);
                })
        }
    }
}

LoginComponent.parameters = [FormBuilder];