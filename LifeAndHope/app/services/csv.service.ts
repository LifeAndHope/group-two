/**
 * Created by oyvindkg on 28/04/16.
 */


export class CSVService {

    public static CSVForObjects(objects: Array<Object>, separator: string = ","): string {
        if (!objects) {
            return ""
        }

        let keys = Object.keys(objects[0]);

        let objectValues: Array<string> = [];

        for (let object of objects) {
            objectValues.push( keys.map(key => {return "\"" + object[key] + "\""}).join(separator) );
        }

        let header = keys.map(key => "\"" + key + "\"").join(separator) + "\n";

        return header + objectValues.join("\n");
    }

    public static download(fileName: string, csv: string) {
        let blob = new Blob([csv], {type: 'text/csv'});

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            let tempElement = window.document.createElement('a');
            tempElement.href = window.URL.createObjectURL(blob);
            tempElement.download = fileName;

            document.body.appendChild(tempElement)
            tempElement.click();
            document.body.removeChild(tempElement);
        }
    }

}