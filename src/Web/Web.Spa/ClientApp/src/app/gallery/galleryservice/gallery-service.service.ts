import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GalleryVideo } from 'src/app/models/galleryvideo';
import { Observable } from 'rxjs';

@Injectable()
export class GalleryService {
  galleryUrl = environment.backendUrl + '/Gallery';
  categoriesUrl = environment.backendUrl + '/GalleryCategories';
  videosUrl = environment.backendUrl + '/GalleryVideos';
  constructor(private http: HttpClient ) {
      }

  getGalleries() {
      return this.http.get(this.galleryUrl , { responseType: 'json'});
    }

  getCategories() {
      return this.http.get(this.categoriesUrl , { responseType: 'json'});
    }

  getCategory(id: string) {
      return this.http.get(this.categoriesUrl + '/' + id, { responseType: 'json'});
    }

  getVideos(): Observable<GalleryVideo[]> {
      return this.http.get<GalleryVideo[]>(this.videosUrl, { responseType: 'json'});
    }
}
