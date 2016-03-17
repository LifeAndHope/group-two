import {Component, Input, Output, EventEmitter} from 'angular2/core';


const template = `
<div class="gallery">
    <div id="full-screen" class="text-center">
        <img src="{{sources[selectedIndex]}}" class="center-vertical">
    </div>

    <a class="thumbnail" (click)="selectThumbnail(index)"  *ngFor="#source of sources; #index = index">
        <img src="{{source}}">
    </a>
</div>

<style>
    .gallery {
        width: 100%;
        height: 200px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .gallery>.thumbnail>img{
        height: 100%;
        width: auto;
        object-fit: cover;
    }

    .gallery>.thumbnail {
        transition: all 300ms ease-in-out;
        height: 200px;
        display: inline-block;
        margin: 0 1.5rem;
    }

    .gallery>.thumbnail:first-child,
    .gallery>.thumbnail:last-child {
        margin: 0;
    }

    .gallery>.thumbnail:hover {
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
    sources: Array<string> = [
        "http://images.matprat.no/8n2mc52r56-jumbotron/large",
        "http://im.rediff.com/news/2015/dec/24tpoty20.jpg",
        "http://i164.photobucket.com/albums/u8/hemi1hemi/COLOR/COL9-6.jpg",
        "https://www.planwallpaper.com/static/images/nasas-images-of-most-remarkable-events-you-cant-miss.jpg",
        "https://static.pexels.com/photos/1029/landscape-mountains-nature-clouds.jpg"
    ];

    selectedIndex: number;

    constructor() {
        key('esc', this.closeFullscreen);
        key('right', event => {
            this.selectedIndex = Math.min(this.selectedIndex+1, this.sources.length-1);
            this.updateFullscreenImage();
            event.preventDefault();
        })
        key('left', event => {
            this.selectedIndex = Math.max(this.selectedIndex-1, 0);
            this.updateFullscreenImage();
            event.preventDefault();
        })
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