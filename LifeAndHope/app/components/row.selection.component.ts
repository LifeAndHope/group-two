import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {TableComponent} from "./table.component";
import {FilterGenerator} from "./filter.generator";
import {FilterBy} from "../pipes/filter.by";
import {Column} from "./table.component";


@Component({
    selector: "row-selection",
    templateUrl: 'app/components/views/row.selection.html',
    directives: [TableComponent, FilterGenerator],
    pipes: [FilterBy]
})

export class RowSelectionComponent {

    @Input() columns: Array<Column>;
    @Input() rows: Array<any>;
    @Input() title: string;

    @Output() selected = new EventEmitter();

    filter = {text: "", keys: []};

    initialized = false;

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.initialized = true;
    }

    selectedRow(row) {
        $(this.element.nativeElement).children('.modal').modal('hide');
        this.selected.next(row);
    }

    showModal() {
        $(this.element.nativeElement).children('.modal').modal('show');
    }
}

RowSelectionComponent.parameters = [ElementRef];