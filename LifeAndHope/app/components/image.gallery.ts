import {Component, Input, Output, EventEmitter} from 'angular2/core';


const template = `
<div class="container-fluid gallery">
    <div class="row">
        <div class="col-xs-11 col-sm-5" *ngFor="#source of sources">
            <a class="thumbnail" (click)="selectThumbnail($event)">
                <img src="{{source}}">
            </a>
        </div>
    </div>
</div>

<style>
    .gallery .thumbnail a>img, .thumbnail>img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .gallery .row {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        height: 200px;
    }

    .gallery>.row>[class*="col"] {
        display: inline-block;
        float: none;
    }

    .gallery .thumbnail {
        transition: all 300ms ease-in-out;
        height: 200px;
        margin-bottom: 0;
    }

    .gallery .thumbnail:hover {
        cursor: pointer;
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

    selected: any;

    selectThumbnail(event) {
        console.log(event);
        if (this.selected) {
            this.selected.classList.remove("selected");
        }

        this.selected = event.target;

        this.selected.classList.add("selected");

        event.preventDefault();
    }
}