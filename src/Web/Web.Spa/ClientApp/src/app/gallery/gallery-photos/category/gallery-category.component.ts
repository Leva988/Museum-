import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Gallery } from 'src/app/models/gallery';

declare var $: any;

@Component({
  selector: 'app-gallery-category',
  templateUrl: './gallery-category.component.html',
  styleUrls: ['./gallery-category.component.scss'],
  providers: [FaConfig, FaIconLibrary]
})

export class GalleryCategoryComponent implements OnInit {

  faphoto = faPhotoVideo;
  gallery: Gallery = new Gallery();
  @Input() galleries: Gallery[] = [];
  imagesId: string [] = [];
  galleryUrl = environment.backendUrl + '/Gallery';

  constructor() {
   }

   ngOnInit() {
    $('#Modal').on('hide.bs.modal', () => {
       this.imagesId = [];
     });
  }

  fetchImgs() {
    this.imagesId = this.gallery.items;
  }

}
