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

    /* The data to be filtered */
    @Input() data: Array<any>;

    /* Event emitting filtered data */
    @Output() filtered = new EventEmitter();


    setFilterProperty(property) {
        this.filterProperty = property;
        this.updateFilteredData();
    }

    updateFilteredData() {
        let filterProperties = this.filterProperty ? [this.filterProperty] : this.properties;

        function matchesSearchTerm(item: Object): boolean {
            for (let i in filterProperties) {
                if (!filterProperties[i]) {
                    return true;
                }

                if (!item[filterProperties[i].key]) {
                    return false;
                }

                let value = item[filterProperties[i].key].toString();

                if (value.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
                    return true;
                }
            }

            return false;
        }

        this.filtered.next(this.data.filter(item => matchesSearchTerm.call(this, item)));
    }
}