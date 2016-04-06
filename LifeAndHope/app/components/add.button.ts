import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';


@Component({
    selector: "add-button",
    templateUrl: 'app/components/views/add.button.html'
})

export class AddButtonComponent {

    @Input() fields: Array<Field>;
    @Input() title: string;

    @Output() save = new EventEmitter();

    form: ControlGroup;

    constructor(private formBuilder: FormBuilder, private element: ElementRef) {}

    ngOnInit() {
        let controlGroupDefinition = {};

        for (let field of this.fields) {
            let controlDefinition = [field.value];

            if (field.required) {
                controlDefinition.push(Validators.required)
            }

            controlGroupDefinition[field.key] = controlDefinition;
        }

        this.form = this.formBuilder.group(controlGroupDefinition);
    }

    saveData() {
        this.save.next(this.form.value);
    }

    showModal() {
        $(this.element.nativeElement).children('.modal').modal('show')
    }
}

AddButtonComponent.parameters = [FormBuilder, ElementRef];

export interface Field {
    key: string;
    type: string;

    value?: any;
    name?: string;
    description?: string;
    options?: Array<any>;
    required?:boolean;
}