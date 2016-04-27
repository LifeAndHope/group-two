import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';
import {InfoBoxComponent} from "./info.box";
import {DropZone} from "../directives/dropZone.directive";
import {Sponsor, Transaction} from "../datatypes/models";
import {Property} from "./info.box";
import {RowSelectionComponent} from "./row.selection.component";
import {Child} from "../datatypes/models";
import {Column} from "./table.component";
import {SponsorService} from "../services/sponsor.service";
import {ChildService} from "../services/child.service";
import {TransactionService} from "../services/transaction.service";


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

        SponsorService.getSponsorById(parameters.params.id)
            .then(sponsor => {
                this.sponsor = sponsor.data.data[0];
                console.log(this.sponsor);

                console.error("Does not retrieve child for sponsor");
            })
            .catch(error => console.log(error));

        ChildService.getChildren()
            .then(response => {
                console.log(response.data.data);
                this.children = response.data.data
            });

        /* Get transactions from the sponsor */
        TransactionService.getTransactionsFromSponsor(parameters.params.id)
            .then(response => {
                this.transactions = response;
            });
    }

    selectChild(child) {
        console.error("Cannot set child for sponsors");
    }

    updateSponsor(event) {
        SponsorService.updateSponsor(this.sponsor)
            .then(response => console.log(response))
            .catch(response => console.log(response))
    }


}

SponsorComponent.parameters = [RouteParams]
