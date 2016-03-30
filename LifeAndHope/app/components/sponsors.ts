import {Component} from "angular2/core";
import {Sponsor} from "../datatypes/models";
import {CanActivate, RouterLink} from 'angular2/router';
import {DataService} from "../services/data.service";
import {Property, FilterGenerator} from "./filter.generator";
import {FilterBy} from "../pipes/filter.by";
import {InfoBoxComponent} from "./info.box";

@Component({
    selector: 'sponsors',
    templateUrl: 'app/components/views/sponsors.html',
    directives: [FilterGenerator, InfoBoxComponent, RouterLink],
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

    filter = {text: "", keys: []};

    initialized = false;

    ngOnInit() {
        this.initialized = true;

        DataService.getSponsors()
            .then(response => {
                this.sponsors = response.data.data;
            })
    }
}