import {Component} from 'angular2/core';
import {CanActivate, RouterLink} from 'angular2/router';
import {FilterGenerator} from "./filter.generator";
import {Child} from "../datatypes/models";
import {DataService} from "../services/data.service";
import {Property} from "./filter.generator";
import {FilterBy} from "../pipes/filter.by";
import {InfoBoxComponent} from "./info.box";

@Component({
    selector: 'Hovedside',
    templateUrl: 'app/components/views/children.html',
    directives: [FilterGenerator, InfoBoxComponent, RouterLink],
    pipes: [FilterBy]
})

export class ChildrenComponent {
    // Do fancy stuff

    children: Array<Child>;

    properties: Array<Property> = [
        {key: "first_name",     name: "First name"},
        {key: "last_name",      name: "Last name"},
        {key: "sex",            name: "Gender"},
        {key: "date_of_birth",  name: "Birth date"},
        {key: "account_number", name: "Account number"},
        {key: "description",    name: "Description"},
    ];

    filter = {text: "", keys: []};
    initialized = false;

    ngOnInit() {
        this.initialized = true;

        DataService.getChildren()
            .then(response => {
                this.children = response.data.data;
            })
    }

}


/**BarnVisning.onclick = function() {
    alert(ChildrenComponent.barn())
}

FadderVisning.onclick = function() {
    alert(ChildrenComponent.Fadder())
}

addChild.onclick = function() {
    alert(ChildrenComponent.addChild())
}**/
