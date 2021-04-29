import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { GalleryCategory } from 'src/app/models/galleryCategory';
import { Gallery } from 'src/app/models/gallery';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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

  constructor(private service: GalleryService, private route: ActivatedRoute, private router: Router) {
    this.allCategories();
   }

  ngOnInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
       if (this.route.snapshot.params.category === 'all') {
          this.allCategories();
       } else {
        const cat = this.categories.find(x => x.name === this.route.snapshot.params.category);
        this.getCategory(cat.id);
       }
      }
     });
  }

  allCategories() {
    this.galleries = [];
    this.service.getCategories().subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      (data: GalleryCategory[]) => {
         this.categories = data;
         if (this.categories.length !== 0) {
          this.categories.forEach(cat => {
            this.galleries = this.galleries.concat(cat.galleries);
           });
         }
      }, error => console.log(error));
  }

  getCategory(id) {
    this.service.getCategory(id).subscribe(
      (data: GalleryCategory) => {
        this.galleries = data.galleries;
      }, error => console.log(error)
    );
  }


}
