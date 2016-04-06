import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';
import {InfoBoxComponent} from "./info.box";
import {DropZone} from "../directives/drop.zone";
import {Sponsor, Transaction} from "../datatypes/models";
import {Property} from "./info.box";
import {DataService} from "../services/data.service";


@Component({
    directives: [InfoBoxComponent, DropZone],
    templateUrl: 'app/components/views/sponsor.html'
})

export class SponsorComponent {

    sponsor: Sponsor;

    properties: Array<Property> = [
        {key: "first_name",     name: "First name"},
        {key: "last_name",      name: "Last name"},
        {key: "phone",          name: "Phone"},
        {key: "email",          name: "Email"},
        {key: "join_date",      name: "Join date"},
        {key: "address",        name: "Address"}
    ];

    transactions: Array<Transaction>;

    constructor(parameters: RouteParams) {

        DataService.getSponsorById(parameters.params.id)
            .then(sponsor => {
                this.sponsor = sponsor.data.data[0];
                console.log(this.sponsor);
            })
            .catch(error => console.log(error));

        /* Get transactions from the sponsor */
        DataService.getTransactionsFromSponsor(parameters.params.id)
            .then(response => {
                this.transactions = response;
            });
    }

}

SponsorComponent.parameters = [RouteParams]
