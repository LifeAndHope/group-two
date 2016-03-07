import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'filterBy'})

/**
 *  Filter used to filter objects
 *
 *  Usage:
 *  Array<Object> | filterBy: string term [: Array<string> keys]
 *
 */
export class FilterBy implements PipeTransform {

    transform(input:any, args:string[]) : any {
        /* No filter provided */
        if (args.length == 0) {
            return input;
        }

        const searchTerm: any = args[0];

        /* Verify that the data is valid */
        const searchTermIsString = typeof searchTerm === 'string' || searchTerm instanceof String;
        const optionalKeysAreValid = args.length < 2 || Array.isArray(args[1]);
        if (!Array.isArray(input) || !searchTermIsString || !optionalKeysAreValid) {
            return input;
        }

        /* Use provided keys if available */
        let keys: Array<string> = args[1];
        if (!keys) {
            keys = Object.keys(input[0])
                         .filter(key => input[0].hasOwnProperty(key));
        }

        function matchesSearchTerm(item: Object): boolean {
            for (let i in keys) {
                let value = item[keys[i]].toString();
                if (value.toLowerCase().indexOf(args[0].toLowerCase()) > -1) {
                    return true;
                }
            }

            return false;
        }

        return input.filter(matchesSearchTerm);
    }
}