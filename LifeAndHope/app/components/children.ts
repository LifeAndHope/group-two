import {Component} from 'angular2/core';
import {CanActivate, RouterLink, Router} from 'angular2/router';
import {FilterGenerator} from "./filter.generator";
import {Child} from "../datatypes/models";
import {DataService} from "../services/data.service";
import {Property} from "./filter.generator";
import {FilterBy} from "../pipes/filter.by";
import {InfoBoxComponent} from "./info.box";
import {AddButtonComponent} from "./add.button";
import {Field} from "./add.button";
import {TableComponent} from "./table.component";

@Component({
    selector: 'Hovedside',
    templateUrl: 'app/components/views/children.html',
    directives: [FilterGenerator, InfoBoxComponent, RouterLink, AddButtonComponent, TableComponent],
    pipes: [FilterBy]
})

export class ChildrenComponent {
    // Do fancy stuff

    children: Array<Child>;

    properties: Array<Property> = [
        {key: "first_name",     name: "Fornavn"},
        {key: "last_name",      name: "Etternavn"},
        {key: "gender",         name: "Kjønn"},
        {key: "account_number", name: "Kontonummer", customClasses: "hidden-xs"},
        {key: "description",    name: "Generelt", customClasses: "hidden-sm hidden-xs"},
        {key: "school_name",    name: "Skole", customClasses: "hidden-xs"},
        {key: "school_address", name: "Adresse", customClasses: "hidden-sm hidden-xs"},
        {key: "grade",          name: "Trinn"},
    ];

    fields: Array<Field> = [
        {key: "first_name",     name: "Fornavn",     type: "text"},
        {key: "last_name",      name: "Etternavn",      type: "text"},
        {key: "gender",         name: "Kjønn",         type: "select", options: ["Male", "Female"]},
        {key: "date_of_birth",  name: "Fødselsdato",     type: "date"},
        {key: "account_number", name: "Kontonummer", type: "number"},
        {key: "description",    name: "Generelt",    type: "text"},
        {key: "school_name",    name: "Skole",    type: "text"},
        {key: "school_address", name: "Adresse", type: "text"},
        {key: "grade",          name: "Trinn",          type: "number"},
    ];

    filter = { text: "", keys: [] };

    initialized = false;

    constructor(private router: Router) {}

    ngOnInit() {
        this.initialized = true;

        DataService.getChildren()
            .then(response => {
                this.children = response.data.data;
            })
    }

    addChild(child: Child) {
        DataService.addChild(child)
            .then(response => {
                this.children.push(child)
            })
            .catch(console.log);
    }

    removeChild(removeChild) {
        DataService.deleteChild(removeChild)
            .then( result => {
                this.children = this.children.filter(child => return child.id !== removeChild.id)
            })
            .catch(result => {
                console.log(result)
            });
    }

    editChild(child) {
        this.router.navigate(['Child', {id: child.id}]);
    }

}

ChildrenComponent.parameters = [Router];