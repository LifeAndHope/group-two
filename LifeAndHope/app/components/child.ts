import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Child} from "../datatypes/models";
import {InfoBoxComponent} from "./info.box";
import {Property} from "./info.box";
import {FileService} from "../services/file.service";
import {ImageGalleryComponent} from "./image.gallery";
import {DropZone} from "../directives/dropZone.directive";
import {SecureDBFile} from "../datatypes/interfaces";
import {AddButtonComponent} from "./add.button";
import {Field} from "./add.button";
import {Note} from "../datatypes/models";
import {Transaction} from "../datatypes/models";
import {TableComponent} from "./table.component";
import {RowSelectionComponent} from "./row.selection.component";
import {Sponsor} from "../datatypes/models";
import {Column} from "./table.component";
import {SponsorService} from "../services/sponsor.service";
import {ChildService} from "../services/child.service";
import {NoteService} from "../services/note.service";
import {TransactionService} from "../services/transaction.service";

@Component({
    templateUrl: 'app/components/views/child.html',
    directives: [InfoBoxComponent, ImageGalleryComponent, DropZone, AddButtonComponent, RowSelectionComponent, TableComponent]
})

export class ChildComponent {
    child: Child;
    sponsor: Sponsor;

    properties: Array<Property> = [
        {key: "first_name",     name: "Fornavn"},
        {key: "last_name",      name: "Etternavn"},
        {key: "gender",         name: "Kjønn"},
        {key: "date_of_birth",  name: "Fødselsdato"},
        {key: "account_number", name: "Kontonummer"},
        {key: "description",    name: "Beskrivelse"},
        {key: "school_name",    name: "Skole"},
        {key: "school_address", name: "Skoleadresse"},
        {key: "grade",          name: "Trinn"},
    ];

    transactionProperties: Array<any> = [
        {key: "date_sent",      name: "Dato sendt" },
        {key: "date_received",  name: "Dato mottatt"},
        {key: "amount_sent",    name: "Beløp sendt"},
        {key: "amount_received",name: "Beløp mottatt"},
        {key: "child",          name: "Barn"},
        {key: "sponsor",        name: "Fadder"},
    ];

    noteProperties: Array<Column> = [
        {key: "text",     name: "Tekst"},
        {key: "date",     name: "Dato"},
    ];

    noteFields: Array<Field> = [
        {key: "text",     name: "Text",     type: "text", required: true},
    ];

    transactionFields: Array<Field> = [
        {key: "amount_sent",    name: "Beløp sendt (NOK)",  type: "number", required: true},
        {key: "date_sent",      name: "Dato sendt",         type: "date",   required: true, value: new Date()},
        {key: "amount_received",name: "Beløp mottatt (Birr)", type: "number", required: false},
        {key: "date_received",  name: "Dato mottatt",       type: "date",   required: false},
        {key: "receipt",        name: "Kvittering",         type: "file",   required: false},
    ];

    sponsorFields: Array<Column> = [
        {key: "first_name",     name: "Fornavn"},
        {key: "last_name",      name: "Etternavn"},
        {key: "email",          name: "E-post"},
    ];

    fields: Array<Field> = [];

    images: Array<SecureDBFile>;
    imageSources: Array<string>;
    transactions: Array<Transaction>;
    notes: Array<Note>;

    sponsors: Array<Sponsor> = [];

    constructor(parameters: RouteParams) {

        // FIXME: Should not always load all sponsors
        SponsorService.getSponsors()
            .then(response => this.sponsors = response.data.data)
            .catch(res => console.log(res));

        /* Get all images for the child */
        FileService.getImagesForID(parameters.params.id)
            .then(response => {
                this.images = response;
                this.updateImageSources();
            })
            .catch(response => {
                console.log(response);
            });

        NoteService.getNotesFromChild(parameters.params.id)
            .then(response => {
                this.notes = response.data.data;
            });

        /* Get the child */
        ChildService.getChildById(parameters.params.id)
            .then(response => {
                this.child = response.data.data[0];
                console.log(this.child);

                console.error("Does not load sponsors");
            });

        /* Get transactions to the child */
        TransactionService.getTransactionsToChild(parameters.params.id)
            .then(response => {
                this.transactions = response;
            });
    }

    selectParent(sponsor) {
        console.error("Cannor set sponsor for children");
    }

    updateChild(event) {
        ChildService.updateChild(this.child)
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

        NoteService.addNote(note)
            .then(() => {
                alert("Logg opprettet!")
            })
            .catch(r => console.log(r));
    }

    addTransaction(transaction: Transaction) {
        transaction.child = this.child.id;

        transaction.sponsor = this.sponsor.id;

        TransactionService.addTransaction(transaction)
            .then(() => {
                alert("Transaksjon opprettet!")
            })
            .catch(r => console.log(r));
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
