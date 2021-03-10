import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class GalleryService {
  galleryUrl = environment.backendUrl + '/Gallery';
  categoriesUrl = environment.backendUrl + '/GalleryCategories';
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

  getFile(url: string) {
      return this.http.get(url , { responseType: 'blob'});
    }
}
