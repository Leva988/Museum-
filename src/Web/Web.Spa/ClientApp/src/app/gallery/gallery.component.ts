import { Component, OnInit } from '@angular/core';
import { GalleryService } from './galleryservice/gallery-service.service';
import { environment } from 'src/environments/environment';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Gallery } from '../models/gallery';

declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [GalleryService, FaConfig, FaIconLibrary]
})

export class GalleryComponent implements OnInit {
  faphoto = faPhotoVideo;
  gallery: Gallery = new Gallery();
  galleryUrl = environment.backendUrl + '/Gallery';
  galleries: Gallery[] = [];
  imagesId: string [] = [];
  videosId: string [] = [];
  constructor(private galleryService: GalleryService) {
   }

  ngOnInit() {
    this.refreshGalleries();
    $('#Modal').on('hide.bs.modal', () => {
       this.imagesId = [];
       this.videosId = [];
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

 checkFiles(items, id) {
   for (let i = 0; i < items.length; i++) {
    const item = items[i];
    this.galleryService.getFile(this.galleryUrl + '/' + id + '/item/' + item).subscribe(
    // tslint:disable: no-shadowed-variable
    (data: any) => {
        if (data.type !== 'video/mp4') {
          this.imagesId.push(item);
          this.imagesId = Array.from(new Set(this.imagesId));
        } else {
          this.videosId.push(item);
          this.videosId = Array.from(new Set(this.videosId));
        }
      }
    );
   }
  }
}
