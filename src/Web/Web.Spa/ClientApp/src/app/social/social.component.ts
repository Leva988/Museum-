import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialService } from './social-service/social-service.service';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { KeyValue } from '@angular/common';
import { SocialCategory } from '../models/socialcategory';
import { Gallery } from '../models/gallery';

declare var $: any;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  providers: [SocialService, FaConfig, FaIconLibrary]
})
export class SocialComponent implements OnInit  {
  faphoto = faPhotoVideo;
  title = 'Социальная жизнь';
  links: KeyValue<string, string> [] = [];
  categories: SocialCategory[] = [];
  imagesId: string[] = [];
  videosId: string[] = [];
  gallery: Gallery = new Gallery();
  socialUrl = environment.backendUrl + '/SocialCategories';
  galleryUrl = environment.backendUrl + '/Gallery';
  constructor(private socialService: SocialService)  {
  }

  ngOnInit() {
    this.refreshCategories();
    $('#Modal').on('hide.bs.modal', (event) => {
      this.imagesId = [];
      this.videosId = [];
    });
  }

  refreshCategories() {
    this.socialService.getCategories(this.socialUrl).subscribe(
      (data: SocialCategory[]) => {
        // tslint:disable: prefer-for-of
        this.categories = data;
        for (let i = 0; i < this.categories.length; i++) {
          const cat = this.categories[i];
          const id = 'block' + i;
          const head = { key : id, value: cat.name };
          this.links.push(head);
          for (let j = 0; j < cat.galleries.length; j++) {
            const gallery = cat.galleries[j];
            const date = new Date(Date.parse(gallery.date));
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            const local = date.toLocaleDateString(undefined, options);
            gallery.date = local;
            }
          }
        },
       error => console.log(error));
      }

    checkFiles(items, id) {
      for (let i = 0; i < items.length; i++) {
       const item = items[i];
       this.socialService.getFile(this.galleryUrl + '/' + id + '/item/' + item).subscribe(
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
