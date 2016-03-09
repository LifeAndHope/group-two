import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'humanize'})

/**
 *  Convert CamelCase and delimiter-separated text to normal strings
 *
 *  Usage:
 *  string | humanize
 *
 */
export class Humanize implements PipeTransform {

    transform(input:any, args:string[]) : any {
        const isString: boolean = input instanceof String || typeof input === "string";

        if (!isString) {
            return input;
        }

        const capitalize = args.indexOf('capitalize') > -1;

        let result = capitalize ? input[0].toUpperCase() : input[0];
        for (let i = 1; i < input.length; i++) {

            if (input[i] === "_" || input[i] === "-") {
                result += " " + input[++i];
                continue;
            }

            if (input[i] === input[i].toUpperCase()) {
                result += " " + input[i].toLowerCase();
                continue;
            }

            result += input[i];
        }

        return result;
    }
}