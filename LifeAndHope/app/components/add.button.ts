import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';


const template = `
<button type="button" class="btn btn-success" data-toggle="modal" data-target="#inputModal"><span class="glyphicon glyphicon-plus"></span> {{title}}</button>

<div id="inputModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body">


        <form [ngFormModel]="form" (ngSubmit)="saveData()">
            <div *ngFor="#field of fields" class="form-group">
                <label>{{field.name}}</label>

                <!-- Regular input -->
                <input *ngIf="field.type !== 'select' && field.type !== 'radio'" type="{{field.type}}" class="form-control" id="{{field.key}}" placeholder="{{field.name}}" ngControl="{{field.key}}" required>

                <!-- Options -->
                <select *ngIf="field.type === 'select'" class="form-control" name="{{field.key}}" ngControl="{{field.key}}">
                    <option *ngFor="#option of field.options" value="{{option}}">{{option}}</option>
                </select>

                <!-- Radio buttons -->
                <!--<span *ngFor="#option of field.options">-->
                    <!--<br>-->
                    <!--<input type="radio" name="{{field.key}}" ngControl="{{field.key}}" value="{{option}}"> {{option}}-->
                <!--</span>-->
            </div>
        </form>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" data-dismiss="modal" (click)="saveData()">Save</button>
      </div>
    </div>

  </div>
</div>
`;


@Component({
    selector: "input-view",
    template: template,
})

export class AddButtonComponent {

    @Input() fields: Array<Field>;
    @Input() title: string;

    @Output() save = new EventEmitter();

    form: ControlGroup;

    constructor(private formBuilder: FormBuilder) {
        console.log(this.title, this.fields);

    }

    ngOnInit() {
        let controlGroupDefinition = {};
        for (let field of this.fields) {
            controlGroupDefinition[field.key] = [field.value, Validators.required]
        }

        this.form = this.formBuilder.group(controlGroupDefinition);
    }

    saveData() {
        console.log(this.form.value);
        this.save.next(this.form.value);
    }
}

AddButtonComponent.parameters = [FormBuilder];

export interface Field {
    key: string;
    type: string;

    value?: any;
    name?: string;
    description?: string;
    options?: Array<any>;
}