import {Component, View} from 'angular2/core';
import {OrderBy} from '../pipes/orderBy';
import {FilterBy} from "../pipes/filterBy";
import {Child} from "../datatypes/models";

@Component({
    selector: 'listComponent',
    templateUrl: 'app/Hovedside.html',
    pipes: [OrderBy, FilterBy]
})

export class ListComponent {

    filterModel = {filter: '', key: 'Alle'};

    people: Array<Child> = [
        new Child('id', 'Ola', 'Nordmann', 'Male', new Date(), '12390329012', 'school_id', 'Ola het han, og gråt da han ble født.'),
        new Child('id', 'Kongo', 'Bongo', 'Male', new Date(), '75532523134', 'school_id', ''),
        new Child('id', 'Baka', 'Kaka', 'Male', new Date(), '63453221332', 'school_id', ''),
        new Child('id', 'Lire', 'Slire', 'Male', new Date(), '76238955139', 'school_id', ''),
        new Child('id', 'Tanker', 'Banker', 'Male', new Date(), '14794957349', 'school_id', ''),
        new Child('id', 'Ola', 'Nordmann', 'Male', new Date(), '12390329012', 'school_id', 'Ola het han, og gråt da han ble født.'),
        new Child('id', 'Kongo', 'Bongo', 'Male', new Date(), '75532523134', 'school_id', ''),
        new Child('id', 'Baka', 'Kaka', 'Male', new Date(), '63453221332', 'school_id', ''),
        new Child('id', 'Lire', 'Slire', 'Feale', new Date(), '76238955139', 'school_id', ''),
        new Child('id', 'Tanker', 'Banker', 'Male', new Date(), '14794957349', 'school_id', ''),
        new Child('id', 'Ola', 'Nordmann', 'Male', new Date(), '12390329012', 'school_id', 'Ola het han, og gråt da han ble født.'),
        new Child('id', 'Kongo', 'Bongo', 'Male', new Date(), '75532523134', 'school_id', ''),
        new Child('id', 'Baka', 'Kaka', 'Female', new Date(), '63453221332', 'school_id', ''),
        new Child('id', 'Lire', 'Slire', 'Male', new Date(), '76238955139', 'school_id', ''),
        new Child('id', 'Tanker', 'Banker', 'Male', new Date(), '14794957349', 'school_id', ''),
        new Child('id', 'Ola', 'Nordmann', 'Male', new Date(), '12390329012', 'school_id', 'Ola het han, og gråt da han ble født.'),
        new Child('id', 'Kongo', 'Bongo', 'Male', new Date(), '75532523134', 'school_id', ''),
        new Child('id', 'Baka', 'Kaka', 'Male', new Date(), '63453221332', 'school_id', ''),
        new Child('id', 'Lire', 'Slire', 'Male', new Date(), '76238955139', 'school_id', ''),
        new Child('id', 'Tanker', 'Banker', 'Male', new Date(), '14794957349', 'school_id', ''),
        new Child('id', 'Ola', 'Nordmann', 'Male', new Date(), '12390329012', 'school_id', 'Ola het han, og gråt da han ble født.'),
        new Child('id', 'Kongo', 'Bongo', 'Female', new Date(), '75532523134', 'school_id', ''),
        new Child('id', 'Baka', 'Kaka', 'Male', new Date(), '63453221332', 'school_id', ''),
        new Child('id', 'Lire', 'Slire', 'Male', new Date(), '76238955139', 'school_id', ''),
        new Child('id', 'Tanker', 'Banker', 'Male', new Date(), '14794957349', 'school_id', ''),
        new Child('id', 'Ola', 'Nordmann', 'Male', new Date(), '12390329012', 'school_id', 'Ola het han, og gråt da han ble født.'),
        new Child('id', 'Kongo', 'Bongo', 'Female', new Date(), '75532523134', 'school_id', ''),
        new Child('id', 'Baka', 'Kaka', 'Male', new Date(), '63453221332', 'school_id', ''),
        new Child('id', 'Lire', 'Slire', 'Male', new Date(), '76238955139', 'school_id', ''),
        new Child('id', 'Tanker', 'Banker', 'Male', new Date(), '14794957349', 'school_id', ''),
    ];

}