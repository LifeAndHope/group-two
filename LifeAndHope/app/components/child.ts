import {Component} from 'angular2/core';
import {Child} from "../datatypes/models";
import {RouteParams} from 'angular2/router';
import {DataService} from "../services/data.service";
import {InfoBoxComponent} from "./info.box";
import {Property} from "./info.box";
import {FileService} from "../services/file.service";

@Component({
    templateUrl: 'app/components/views/child.html',
    directives: [InfoBoxComponent]
})

export class ChildComponent {
    child: Child;

    properties: Array<Property> = [
        {key: "first_name",     name: "First name"},
        {key: "last_name",      name: "Last name"},
        {key: "sex",            name: "Gender"},
        {key: "date_of_birth",  name: "Birth date"},
        {key: "account_number", name: "Account number"},
    ];

    constructor(parameters: RouteParams) {
        console.log(parameters);

        DataService.getChildById(parameters.params.id)
            .then(response => {
                this.child = response.data.data[0];
            });


        FileService.getFile('042824bf-75d2-4853-9b35-1ab1218f3d47', 'uuid_images')
            .then(response => {
                $("#profile-image")[0].src = 'data:image/jpeg;base64,' + response.data;
            })
            .catch(response => console.log("Error:",response))
    }

    updateChild(event) {
        DataService.updateChild(this.child)
            .then(response => console.log(response))
            .catch(response => console.log(response))
    }
}

ChildComponent.parameters = [RouteParams];
