import {Component, ElementRef, Input} from 'angular2/core';


@Component({
    selector: 'icon',
    template: ''
})


export class IconComponent {
    @Input() name: string;

    constructor(private element: ElementRef) {}


    ngOnInit() {
        this.element.nativeElement.classList.add('glyphicon');
        this.element.nativeElement.classList.add('glyphicon-' + this.element.nativeElement.attributes[0].name);
    }
}

IconComponent.parameters = [ElementRef];