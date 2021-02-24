import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { environment } from 'src/environments/environment';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Gallery } from 'src/app/models/gallery';

declare var $: any;

@Component({
  selector: 'app-gallery-photo',
  templateUrl: './gallery-photo.component.html',
  styleUrls: ['./gallery-photo.component.scss'],
  providers: [GalleryService, FaConfig, FaIconLibrary]
})

export class GalleryPhotoComponent implements OnInit {
  faphoto = faPhotoVideo;
  gallery: Gallery = new Gallery();
  galleryUrl = environment.backendUrl + '/Gallery';
  galleries: Gallery[] = [];
  imagesId: string [] = [];
  constructor(private galleryService: GalleryService) {
   }

  ngOnInit() {
    this.refreshGalleries();
    $('#Modal').on('hide.bs.modal', () => {
       this.imagesId = [];
     });
  }

  refreshGalleries() {
         this.galleryService.getGalleries(this.galleryUrl).subscribe(
          (data: Gallery[]) => {
          // tslint:disable: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            const d = data[i];
            const date = new Date(Date.parse(d.date));
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            const local = date.toLocaleDateString(undefined, options);
            d.date = local;
            this.galleries.push(d);
            }
          },
         error => console.log(error));
  }

  fetchImgs() {
    this.imagesId = this.gallery.items;
  }
}
