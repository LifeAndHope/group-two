import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'orderBy'})

/**
 *  Filter used to order elements ascending or descending on an arbitrary number of keys
 *
 *  Usage:
 *  array | orderBy: string key [: string key]...
 *
 *  Prepend a '-' to order element in ascending order.
 */
export class OrderBy implements PipeTransform {

    transform(input:any, args:string[]) : any {
        if (!Array.isArray(input)) {
            return input;
        }

        let array: Array<any> = input;

        /* Only ES6 supports block scoped variables in functions. Must be defined outside the loop */
        let key: string;
        let operator: string;

        function isOrderedBefore(left, right): boolean {
            if (operator === '-') {
                return left[key] < right[key];
            }
            return left[key] > right[key];
        };

        /* Stable sort the array starting on the last key */
        for (let i in args) {
            key = args[args.length-1-i];

            /* Ascending or descending sort on the given key. Descending is default */
            operator = '+';
            if (key[0] === '-' || key[0] === '+') {
                operator = key[0];
                key = key.substring(1);
            }

            array = mergeSort(array, isOrderedBefore);
        }

        return array;
    }
}



function mergeSort<T>(array: Array<T>, isOrderedBefore: (left:T, right:T) => boolean): Array<T>
{
    if (array.length < 2)
        return array;

    var middle = array.length / 2;
    var left   = array.slice(0, middle);
    var right  = array.slice(middle, array.length);

    return merge(mergeSort(left, isOrderedBefore), mergeSort(right, isOrderedBefore), isOrderedBefore);
}

function merge<T>(left: Array<T>, right: Array<T>, isOrderedBefore: (left:T, right:T)=>boolean): Array<T>
{
    var result = [];

    while (left.length && right.length) {
        if (isOrderedBefore(left[0], right[0])) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}