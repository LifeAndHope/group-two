import {Component} from 'angular2/core';
import {Child} from "../datatypes/models";
import {RouteParams} from 'angular2/router';
import {DataService} from "../services/data.service";
import {InfoBoxComponent} from "./info.box";
import {Property} from "./info.box";
import {FileService} from "../services/file.service";
import {ImageGalleryComponent} from "./image.gallery";
import {DropZone} from "../directives/drop.zone";
import {SecureDBFile} from "../datatypes/interfaces";
import {AddButtonComponent} from "./add.button";
import {Field} from "./add.button";
import {Note} from "../datatypes/models";
import {Transaction} from "../datatypes/models";

@Component({
    templateUrl: 'app/components/views/child.html',
    directives: [InfoBoxComponent, ImageGalleryComponent, DropZone, AddButtonComponent]
})

export class ChildComponent {
    child: Child;

    properties: Array<Property> = [
        {key: "first_name",     name: "First name"},
        {key: "last_name",      name: "Last name"},
        {key: "sex",            name: "Gender"},
        {key: "date_of_birth",  name: "Birth date"},
        {key: "account_number", name: "Account number"},
    ];

    noteFields: Array<Field> = [
        {key: "text",     name: "Text",     type: "text", required: true},
    ];

    transactionFields: Array<Field> = [
        {key: "amount",     name: "Amount",     type: "number", required: true},
        {key: "child",      name: "Child ID",   type: "text",   required: true},
        {key: "sponsor",    name: "Sponsor ID", type: "text",   required: true},
        {key: "date",       name: "Date",       type: "date",   required: true, value: new Date()},
        {key: "receipt",    name: "Receipt",    type: "file",   required: true},
    ];

    fields: Array<Field> = [];

    images: Array<SecureDBFile>;
    imageSources: Array<string>;

    constructor(parameters: RouteParams) {

        /* Get all images for the child */
        FileService.getImagesForID(parameters.params.id)
            .then(response => {
                this.images = response;
                this.updateImageSources();
                if (this.imageSources) {
                    $("#profile-image").attr('src', this.imageSources[0]);
                }
            })
            .catch(response => {
                console.log(response);
            });

        /* Get the child */
        DataService.getChildById(parameters.params.id)
            .then(response => {
                this.child = response.data.data[0];
            });
    }


    updateChild(event) {
        DataService.updateChild(this.child)
            .then(response => console.log(response))
            .catch(response => console.log(response))
    }

    imagesDropped(files) {
        /** Upload the image to SecureDB. Assign the uuid and show in the view when completed */
        for (let file of files) {
            FileService.addImageForID(file, this.child.id)
                .then(uuid => {
                    file.uuid = uuid;
                    this.images.push(file);
                    this.updateImageSources();
                })
                .catch(response => console.log(response));
        }
    }

    addNote(textObject: Object) {
        let note = <Note> textObject;
        note.table_name = "child";
        note.instance_id = this.child.id;
        note.date = new Date();

        console.log(note);
    }

    addTransaction(transaction: Transaction) {
        console.log(transaction);
    }

    private updateImageSources() {
        if (this.images === undefined || this.images === null) {
            this.imageSources = undefined;
        }

        this.imageSources = this.images.map(FileService.blobAsURL);
    }
}

ChildComponent.parameters = [RouteParams];
