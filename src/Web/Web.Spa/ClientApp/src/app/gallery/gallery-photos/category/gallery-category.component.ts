import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Gallery } from 'src/app/models/gallery';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';

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
  // tslint:disable-next-line: variable-name
  _galleries: Gallery[] = [];
  @Input() set galleries(galleries: Gallery[]) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < galleries.length; i++) {
      const d = galleries[i];
      const date = new Date(Date.parse(d.date));
      const local = date.toLocaleDateString(undefined);
      d.date = local;
    }
    this._galleries = galleries;
  } get galleries() { return this._galleries; }
  photos: KeyValue<string, string>[] = [];
  galleryUrl = environment.backendUrl + '/Galleries';
  active = 0;

  constructor(private http: HttpClient) {
   }

   ngOnInit() {
    $('#Modal').on('hide.bs.modal', () => {
       this.photos = [];
     });
  }

  getDescription(id: string, itemIds: string[]) {
    for (const photo of itemIds) {
      this.http.get(this.galleryUrl + '/' + id + '/itemDescription/' + photo, {responseType: 'text'}).subscribe(
        (data: any) => {
          this.photos.push({key: photo, value: data });
        },
        error => console.log(error));
    }
  }
}
