import {Component} from "angular2/core";
import {CanActivate, RouterLink, Router} from 'angular2/router';
import {Sponsor} from "../datatypes/models";
import {DataService} from "../services/data.service";
import {Property, FilterGenerator} from "./filter.generator";
import {FilterBy} from "../pipes/filter.by";
import {InfoBoxComponent} from "./info.box";
import {Field} from "./add.button";
import {AddButtonComponent} from "./add.button";
import {TableComponent} from "./table.component";

@Component({
    selector: 'sponsors',
    templateUrl: 'app/components/views/sponsors.html',
    directives: [FilterGenerator, InfoBoxComponent, RouterLink, AddButtonComponent, TableComponent],
    pipes: [FilterBy]
})

export class SponsorsComponent {
    sponsors: Array<Sponsor>;

    properties: Array<Property> = [
        {key: "first_name",     name: "Fornavn"},
        {key: "last_name",      name: "Etternavn"},
        {key: "phone",          name: "Telefon"},
        {key: "email",          name: "E-post"},
        {key: "join_date",      name: "Medlem siden", customClasses: "hidden-sm hidden-xs"},
        {key: "address",        name: "Adresse",      customClasses: "hidden-xs"}
    ];

    fields: Array<Field> = [
        {key: "first_name",     name: "Fornavn",     type: "text",},
        {key: "last_name",      name: "Etternavn",      type: "text"},
        {key: "phone",          name: "Telefon",      type: "tel"},
        {key: "email",          name: "E-post",         type: "email"},
        {key: "address",        name: "Adresse",        type: "text"},
        {key: "join_date",      name: "Medlem siden",      type: "date", value: new Date()},
    ];


    filter = {text: "", keys: []};

    initialized = false;

    constructor(private router: Router) {}

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

    removeSponsor(removeSponsor) {
        DataService.deleteSponsor(removeSponsor)
            .then( result => {
                this.sponsors = this.sponsors.filter(sponsor => sponsor.id !== removeSponsor.id)
            })
            .catch(result => {
                console.log(result)
            });
    }

    editSponsor(sponsor) {
        this.router.navigate(['Sponsor', {id: sponsor.id}]);
    }
}

SponsorsComponent.parameters = [Router];