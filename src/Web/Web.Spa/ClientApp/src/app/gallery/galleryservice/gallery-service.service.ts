import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GalleryVideo } from 'src/app/models/galleryvideo';
import { Observable } from 'rxjs';

@Injectable()
export class GalleryService {
  galleryUrl = environment.backendUrl + '/Gallery';
  categoriesUrl = environment.backendUrl + '/GalleryCategories';
  videocategoriesUrl = environment.backendUrl + '/VideoCategories';
  videosUrl = environment.backendUrl + '/GalleryVideos';
  constructor(private http: HttpClient ) {
      }

  getGalleries() {
      return this.http.get(this.galleryUrl , { responseType: 'json'});
    }

  getCategories() {
      return this.http.get(this.categoriesUrl , { responseType: 'json'});
    }

  getVideoCategories() {
    return this.http.get(this.videocategoriesUrl);
  }

  getVideoCategory(id: string) {
    return this.http.get(this.videocategoriesUrl + '/' + id);
  }

  getCategory(id: string) {
      return this.http.get(this.categoriesUrl + '/' + id, { responseType: 'json'});
    }

}
