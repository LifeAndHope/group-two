import {Component, Input, EventEmitter, Output} from 'angular2/core';
import {Column} from "./editable.table";


@Component({
    selector: "text-filter",
    templateUrl: "app/components/views/text.filter.html",
})

export class TextFilter {

    private filterProperty: Column;

    public searchTerm = "";

    /* Properties used to filter. Provides a key and the propertys name */
    @Input() properties: Array<Column>;

    /* Event emitting filtered data */
    @Output() filter = new EventEmitter();


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