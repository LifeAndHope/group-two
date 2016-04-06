import {Component} from "angular2/core";
import {CanActivate, RouterLink} from 'angular2/router';
import {Sponsor} from "../datatypes/models";
import {DataService} from "../services/data.service";
import {Property, FilterGenerator} from "./filter.generator";
import {FilterBy} from "../pipes/filter.by";
import {InfoBoxComponent} from "./info.box";
import {Field} from "./add.button";
import {AddButtonComponent} from "./add.button";

@Component({
    selector: 'sponsors',
    templateUrl: 'app/components/views/sponsors.html',
    directives: [FilterGenerator, InfoBoxComponent, RouterLink, AddButtonComponent],
    pipes: [FilterBy]
})

export class SponsorsComponent {
    sponsors: Array<Sponsor>;

    properties: Array<Property> = [
        {key: "first_name",     name: "First name"},
        {key: "last_name",      name: "Last name"},
        {key: "phone",          name: "Phone nr"},
        {key: "email",          name: "Email"},
        {key: "join_date",      name: "Join date"},
        {key: "address",        name: "Address"}
    ];

    fields: Array<Field> = [
        {key: "first_name",     name: "First name",     type: "text",},
        {key: "last_name",      name: "Last name",      type: "text"},
        {key: "phone",          name: "Telephone",      type: "tel"},
        {key: "email",          name: "E-mail",         type: "email"},
        {key: "address",        name: "Address",        type: "text"},
        {key: "join_date",      name: "Join date",      type: "date", value: new Date()},
    ];


    filter = {text: "", keys: []};

    initialized = false;

    ngOnInit() {
        this.initialized = true;

        DataService.getSponsors()
            .then(response => {
                this.sponsors = response.data.data;
            })
    }

    addSponsor(sponsor) {
        DataService.addSponsor(sponsor)
            .then(response => {
                this.sponsors.push(sponsor);
            })
            .catch(console.log)
    }
}