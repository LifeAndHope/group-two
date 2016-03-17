import {Component, Input, EventEmitter, Output} from 'angular2/core';
import {Column} from "./editable.table";

//declare function key(keys: string, callback: (Event)=>void);


interface Filter {
    text: string,
    keys: Array<string>
}

export interface Property {
    key: string;
    name: string;
}


@Component({
    selector: "filter-generator",
    templateUrl: "app/components/views/filter.generator.html",
})

export class FilterGenerator {

    private filterProperty: Column;

    public searchTerm = "";

    /* Properties used to filter. Provides a key and the propertys name */
    @Input() properties: Array<Column>;

    /* Event emitting filtered data */
    @Output() filter = new EventEmitter();

    constructor() {
        key("command+f, ctrl+f", (event) => {
            $("#search")[0].focus();
            event.preventDefault();
        })
    }

    setFilterProperty(property) {
        this.filterProperty = property;
        this.updateFilter();
    }

    updateFilter() {
        let filterProperties = this.filterProperty ? [this.filterProperty] : this.properties;

        const filter = {
            text: this.searchTerm,
            keys: filterProperties.map(property => property.key)
        };

        this.filter.next(filter);
    }
}