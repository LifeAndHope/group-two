import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';
import {InfoBoxComponent} from "./info.box";
import {DropZone} from "../directives/drop.zone";
import {Sponsor, Transaction} from "../datatypes/models";
import {Property} from "./info.box";
import {DataService} from "../services/data.service";
import {RowSelectionComponent} from "./row.selection.component";
import {Child} from "../datatypes/models";
import {Column} from "./table.component";


@Component({
    directives: [InfoBoxComponent, DropZone, RowSelectionComponent],
    templateUrl: 'app/components/views/sponsor.html'
})

export class SponsorComponent {

    sponsor: Sponsor;
    children: Array<Child> = [];
    child: Child;

    properties: Array<Property> = [
        {key: "first_name",     name: "Fornavn"},
        {key: "last_name",      name: "Etternavn"},
        {key: "phone",          name: "Telefon"},
        {key: "email",          name: "E-post"},
        {key: "join_date",      name: "Medlem siden"},
        {key: "address",        name: "Adresse"}
    ];

    childColumns: Array<Column> = [
        {key: "first_name",     name: "Fornavn"},
        {key: "last_name",      name: "Etternavn"},
        //{key: "email",          name: "E-post"},
    ];

    transactions: Array<Transaction>;

    constructor(parameters: RouteParams) {

        DataService.getSponsorById(parameters.params.id)
            .then(sponsor => {
                this.sponsor = sponsor.data.data[0];
                console.log(this.sponsor);

                if (this.sponsor.child) {
                    DataService.getChildById(this.sponsor.child)
                        .then(result => this.child = result.data.data[0])

                }
            })
            .catch(error => console.log(error));

        DataService.getChildren()
            .then(response => {
                console.log(response.data.data);
                this.children = response.data.data
            });

        /* Get transactions from the sponsor */
        DataService.getTransactionsFromSponsor(parameters.params.id)
            .then(response => {
                this.transactions = response;
            });
    }

    selectChild(child) {
        this.sponsor.child = child.id;
        DataService.updateSponsor(this.sponsor)
            .then(res => {
                this.child = child;
            })
            .catch(res => console.log(res))
    }

    updateSponsor(event) {
        DataService.updateSponsor(this.sponsor)
            .then(response => console.log(response))
            .catch(response => console.log(response))
    }


}

SponsorComponent.parameters = [RouteParams]
