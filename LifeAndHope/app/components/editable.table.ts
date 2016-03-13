import {Component, Input, EventEmitter, Output} from 'angular2/core';


export interface Column {
    name: string;
    key: string;
    customClasses?: string;
}



@Component({
    selector: 'editable-table',
    templateUrl: 'app/components/views/editable.table.html',
    events : ['edit', 'remove']
})

export class EditableTable {
    @Input() columns: Array<Column>;
    @Input() rows: Array<any>;

    @Input() editable: boolean = false;
    @Input() removable: boolean = false;

    constructor() {
        this.edit = new EventEmitter();
        this.remove = new EventEmitter();
    }

    editRow(row): void {
        this.edit.next(row);
    }

    removeRow(row): void {
        this.remove.next(row);
    }
}