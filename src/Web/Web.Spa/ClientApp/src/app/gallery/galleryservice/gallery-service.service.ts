import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GalleryService {
  constructor(private http: HttpClient ) {
      }

  getGalleries(url: string) {
      const heads = new HttpHeaders();
      return this.http.get(url , { responseType: 'json'});
    }

  getFile(url: string) {
      return this.http.get(url , { responseType: 'blob'});
    }
}
