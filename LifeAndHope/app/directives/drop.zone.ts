import {Directive, Output, EventEmitter, Input, ElementRef} from 'angular2/core';


@Directive({
    selector: "[dropZone]"
})

export class DropZone {
    @Output() dropped = new EventEmitter();

    constructor(el: ElementRef) {
        const element = $(el.nativeElement);

        element.on('drag dragstart dragend dragover dragenter dragleave drop', event => {
            event.preventDefault();
            event.stopPropagation();
        });

        element.bind('dragover dragenter', () => {
            element.addClass('drag-over');
        });

        element.bind('dragleave dragend drop', () => {
            element.removeClass('drag-over');
        });

        element.bind('drop', event => {
            this.dropped.next(event.originalEvent.dataTransfer.files);
        })
        
    }
}

DropZone.parameters = [ElementRef];