import {Component, Input} from 'angular2/core';


const template = `
<div class="gallery">
    <div id="full-screen" class="text-center">
        <span class="glyphicon glyphicon-remove close-button" (click)="closeFullscreen()"></span>
        <img src="" class="center-vertical">

        <span class="gallery-nav gallery-nav-right glyphicon glyphicon-chevron-right center-vertical"
              (click)="nextImage()"></span>
        <span class="gallery-nav gallery-nav-left glyphicon glyphicon-chevron-left center-vertical"
              (click)="previousImage()"></span>
    </div>
    <div class="thumbnails">
        <a class="thumbnail" (click)="selectThumbnail(index)"  *ngFor="#source of sources; #index = index">
            <img src="{{source}}">
        </a>
    </div>
</div>

<style>
    .gallery #full-screen .gallery-nav {
        font-size: xx-large;
        position: fixed;
        color: white;
        margin: 2rem;
        cursor: pointer;
        transition: color 200ms linear;
    }

    .gallery #full-screen .gallery-nav:hover,
    .gallery #full-screen .close-button:hover {
        color: lightgray;
    }

    .gallery #full-screen .gallery-nav-left {
        left: 0;
    }

    .gallery #full-screen .gallery-nav-right {
        right: 0;
    }

    .gallery #full-screen .close-button {
        position: fixed;
        top: 0;
        right: 0;
        margin: 2rem;
        color: white;
        font-size: x-large;
        cursor: pointer;
        transition: color 200ms linear;
    }

    .gallery {
        width: 100%;
        height: 200px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .gallery>.thumbnails>.thumbnail>img{
        height: 100%;
        width: auto;
        object-fit: cover;
    }

    .gallery>.thumbnails>.thumbnail {
        transition: all 300ms ease-in-out;
        height: 200px;
        display: inline-block;
        margin: 0 1.5rem;
    }

    .gallery>.thumbnails>.thumbnail:first-child {
        margin-left: 0;
    }
    .gallery>.thumbnails>.thumbnail:last-child {
        margin-right: 0;
    }

    .gallery>.thumbnails>.thumbnail:hover {
        cursor: pointer;
    }

    .gallery>#full-screen {
        display: none;
        position: fixed;
        background: rgba(0,0,0,0.9);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    }

    .gallery>#full-screen>img {
        height: auto;
        width: auto;
        max-height: 90%;
        max-width: 90%;
    }

    .center-vertical {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
`;

@Component({
    selector: 'image-gallery',
    template: template
})

export class ImageGalleryComponent {
    @Input() sources: Array<string> = [];

    selectedIndex: number;

    constructor() {
        key('esc', this.closeFullscreen);
        key('right', event => {
            this.nextImage();
            event.preventDefault();
        });
        key('left', event => {
            this.previousImage();
            event.preventDefault();
        });
    }

    previousImage() {
        this.selectedIndex = Math.max(this.selectedIndex-1, 0);
        this.updateFullscreenImage();
    }

    nextImage() {
        this.selectedIndex = Math.min(this.selectedIndex+1, this.sources.length-1);
        this.updateFullscreenImage();
    }

    selectThumbnail(index) {
        this.selectedIndex = index;
        this.updateFullscreenImage();
        $('#full-screen').fadeIn(200);
    }

    closeFullscreen() {
        $('#full-screen').fadeOut(200);
    }

    private updateFullscreenImage() {
        $('.gallery #full-screen>img').attr('src', this.sources[this.selectedIndex])
    }
}