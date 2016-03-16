import {Component, Input} from 'angular2/core';


export interface Row {
    key: string;
    name: string;
}


@Component({
    selector:'object-data',
    templateUrl: './app/components/views/object.data.html'
})

export class ObjectDataComponent {

    @Input() object: Object;

    @Input() rowDefinitions: Array<Row>;
}

