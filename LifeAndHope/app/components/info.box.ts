import {Component, Input, Output, EventEmitter} from 'angular2/core';


const template = `
    <table class="table table-condensed">
        <!--<thead>-->
            <!--<tr>-->
                <!--<th>Name</th>-->
                <!--<th>Value</th>-->
            <!--</tr>-->
        <!--</thead>-->
        <tbody>
            <tr *ngFor="#property of properties">
                <td>{{property.name}}</td>
                <td><input class="form-control" type="text" [(ngModel)]="object[property.key]" [disabled]="!editable" (change)="onChange(property)"></td>
            </tr>
        </tbody>
    </table>
`

const style = `
    .table>tbody>tr>td {
        border: none;
    }

    table>tbody>tr>td {
        vertical-align: middle;
    }

    table>tbody>tr>td>.form-control:not(:focus) {
        border-color: transparent;
        box-shadow: none;
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

    @Output() change = new EventEmitter();

    onChange(property) {
        this.change.next({
            property: property,
            object: this.object,
            newValue: this.object[property.key]
        })
    }
}