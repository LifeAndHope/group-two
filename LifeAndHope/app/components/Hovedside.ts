import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {Child} from "../datatypes/models";
import {DataService} from "../services/data.service";
import { RouterLink, Router } from 'angular2/router';
import {Column} from "./editable.table";
import {EditableTable} from "./editable.table";
import {TextFilter} from "./text.filter";
import {FilterBy} from "../pipes/filterBy";

@Component({
    selector: 'Hovedside',
    templateUrl: 'app/components/views/Hovedside.html',
    directives: [RouterLink, EditableTable, TextFilter],
    pipes: [FilterBy]
})

export class HovedsideComponent {
    // Do fancy stuff

    filter = {};
    children: Array<Child>;
    columns: Array<Column> = [
        {name: "First name", key: "first_name"},
        {name: "Last name", key: "last_name"},
        {name: "Gender", key: "sex"},
        {name: "Birth year", key: "date_of_birth"},
        {name: "Account number", key: "account_number"}
    ];

    constructor(private router: Router) {}

    ngOnInit(){
        this.initialized=true;

        DataService.getChildren()
            .then(children => {
                this.children = children;
            })
    }

    editChild(child): void {
        this.router.navigate(['Child', {id: child.id}]);
    }

    removeChild(child): void {
        DataService.removeChild(child)
            .then(response => {
                this.children = this.children.filter(existingChild => existingChild.id != child.id)
            });
    }

    addChild(): void {
        const firstNames = ['Baka', 'Kiki', 'Muggaba', 'Kabana', 'Landganga'];
        const lastNames = ['Karangawa', 'Tubaka', 'Chewbaka', 'Prekki'];
        const genders = ['male', 'female'];

        const child: Child = {
            first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
            last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
            account_number: "12346578901",
            sex: genders[Math.floor(Math.random() * genders.length)],
            date_of_birth: new Date(new Date().getMilliseconds() + Math.floor(Math.random()*1000000000000))
        };

        DataService.addChild(child)
            .then(response => this.children.push(child));
    }
}

HovedsideComponent.parameters = [Router];