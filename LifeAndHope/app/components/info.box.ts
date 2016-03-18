import {Component, Input, Output, EventEmitter} from 'angular2/core';


const template = `
    <table class="table table-condensed">
        <tbody>
            <tr *ngFor="#property of properties">
                <td class="text-left">{{property.name}}</td>
                <td>
                    <input *ngIf="object"
                           class="form-control text-right"
                           type="text"
                           [(ngModel)]="object[property.key]"
                           [disabled]="!editable">
                    <input *ngIf="!object"
                           class="form-control text-right"
                           type="text">
                </td>
            </tr>
        </tbody>
    </table>
`

const style = `
    table {
        table-layout: fixed;
    }

    .table>tbody>tr>td {
        border: none;
    }

    table>tbody>tr>td {
        vertical-align: middle;
    }

    table>tbody>tr>td>.form-control:not(:focus) {
        border-color: transparent;
        background: transparent;
        box-shadow: none;
    }

    table>tbody>tr>td>.form-control:hover:not(:focus) {
        border-color: lightgray;
    }

    table>tbody>tr>td>.form-control:disabled {
        background: white;
        cursor: text;
    }
`;

export interface Property {
    key: string;
    name: string;
}


@Component({
    selector: 'info-box',
    template: template,
    styles: [style]
})


export class InfoBoxComponent {
    @Input() properties: Array<Property>;
    @Input() object: Object;
    @Input() editable = false;
}