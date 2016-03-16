import {Component, Input, Output} from 'angular2/core';


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
                <td>{{object[property.key]}}</td>
            </tr>
        </tbody>
    </table>
`

export interface Property {
    key: string;
    name: string;
}


@Component({
    selector: 'info-box',
    template: template
})


export class InfoBoxComponent {
    @Input() properties: Array<Property>;
    @Input() object: Object;
}