import {Component} from 'angular2/core';
import {Child} from "../datatypes/models";
import {RouteParams} from 'angular2/router';
import {DataService} from "../services/data.service";
import {InfoBoxComponent} from "./info.box";
import {Property} from "./info.box";
import {FileService} from "../services/file.service";
import {ImageGalleryComponent} from "./image.gallery";
import {DropZone} from "../directives/drop.zone";
import {SecureDBFile} from "../services/file.service";

@Component({
    templateUrl: 'app/components/views/child.html',
    directives: [InfoBoxComponent, ImageGalleryComponent, DropZone]
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

    images: Array<SecureDBFile>;
    imageSources: Array<string>;

    constructor(parameters: RouteParams) {

        /* Get all images for the child */
        FileService.getImagesForID(parameters.params.id)
            .then(response => {
                this.images = response;
                this.updateImageSources();
            })
            .catch(response => {
                console.log(response);
            });

        /* Get the child */
        DataService.getChildById(parameters.params.id)
            .then(response => {
                this.child = response.data.data[0];
            });


        /* Get profile image */
        FileService.getFile('a46b3c8c-faf5-4e94-ae7d-20d1d8bf1334', 'uuid_images')
            .then(response => {
                $("#profile-image")[0].src = FileService.blobAsURL(response);
            })
            .catch(response => console.log("Error:",response))
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

    private updateImageSources() {
        if (this.images === undefined || this.images === null) {
            this.imageSources = undefined;
        }

        this.imageSources = this.images.map(FileService.blobAsURL);
    }
}

ChildComponent.parameters = [RouteParams];
