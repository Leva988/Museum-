import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { GalleryCategory } from 'src/app/models/galleryCategory';
import { Gallery } from 'src/app/models/gallery';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-gallery-photo',
  templateUrl: './gallery-photo.component.html',
  styleUrls: ['./gallery-photo.component.scss'],
  providers: [GalleryService, FaConfig, FaIconLibrary]
})

export class GalleryPhotoComponent implements OnInit {

  categories: GalleryCategory[] = [];
  galleries: Gallery[] = [];

  constructor(private galleryservice: GalleryService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.allCategories();
    }

  allCategories() {
    this.galleryservice.getCategories().subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      (data: GalleryCategory[]) => {
         this.categories = data;
         if (this.route.snapshot.params.category === 'all') {
         this.categories.forEach(cat => {
           cat.galleries = this.fixDate(cat.galleries);
           this.galleries = this.galleries.concat(cat.galleries);
          });
          } else {
            this.getCategoryById(this.route.snapshot.params.category);
          }
      }, error => console.log(error));
  }

  getCategoryById(id: string) {
      this.galleryservice.getCategory(id).subscribe(
        (data: GalleryCategory) => {
            data.galleries = this.fixDate(data.galleries);
            this.galleries = data.galleries;
        }, error => console.log(error)
      );
  }



  fixDate(galleries): Gallery[] {
    // tslint:disable: prefer-for-of
    for (let i = 0; i < galleries.length; i++) {
      const d = galleries[i];
      const date = new Date(Date.parse(d.date));
      const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
      const local = date.toLocaleDateString(undefined, options);
      d.date = local;
    }
    return galleries;
  }

}
