
import {Component, Input, EventEmitter, Output} from 'angular2/core';


export interface Column {
    name: string;
    key: string;
    customClasses?: string;
}

const template = `
<table class="table table-default table-hover">
    <thead>
        <tr>
            <th *ngFor="#column of columns" [attr.class]="column.customClasses">{{ column.name }}</th>
            <th *ngIf="editable || removable" class="text-right">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngIf="!rows">
            <td [attr.colspan]="editable || removable ? columns.length+1 : columns.length" class="text-center">
                <span class="spinner glyphicon glyphicon-refresh"></span> Loading data..
            </td>
        </tr>
        <tr *ngFor="#row of rows" [attr.class]="{'selectable': selectable}" (click)="selectRow(row)">
            <td *ngFor="#column of columns" [attr.class]="column.customClasses">{{row[column.key]}}</td>

            <td *ngIf="editable || removable" class="text-right">
                <!-- Edit button if editable -->
                <button *ngIf="editable" type="button" class="btn btn-default btn-info" (click)="editRow(row)">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <!-- Remove button if removable -->
                <button *ngIf="removable" type="button" class="btn btn-default btn-danger" (click)="removeRow(row)">
                    <span class="glyphicon glyphicon-trash"></span>
                </button>
            </td>
        </tr>
    </tbody>
</table>

<style>
    .selectable {
        cursor: pointer;
    }
</style>`;



@Component({
    selector: 'dynamic-table',
    template: template,
    events : ['edit', 'remove', 'selected']
})

export class TableComponent {
    @Input() columns: Array<Column>;
    @Input() rows: Array<any>;

    @Input() editable: boolean = false;
    @Input() removable: boolean = false;
    @Input() selectable: boolean = false;

    constructor() {
        this.edit = new EventEmitter();
        this.remove = new EventEmitter();
        this.selected = new EventEmitter();
    }

    editRow(row): void {
        this.edit.next(row);
    }

    removeRow(row): void {
        this.remove.next(row);
    }

    selectRow(row): void {
        if (this.selectable) {
            this.selected.next(row);
        }
    }
}