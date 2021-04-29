import { Component,  OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { Observable } from 'rxjs';
import { GalleryVideo } from 'src/app/models/galleryvideo';
import { environment } from 'src/environments/environment';
import { VideoCategory } from 'src/app/models/videocategory';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-video',
  templateUrl: './gallery-video.component.html',
  styleUrls: ['./gallery-video.component.scss'],
  providers: [GalleryService]
})

export class GalleryVideoComponent implements OnInit {

  categories: VideoCategory[] = [];
  videos: GalleryVideo[] = [];
  videoUrl = environment.backendUrl + '/GalleryVideos';
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
    this.videos = [];
    this.service.getVideoCategories().subscribe(
      (data: VideoCategory[]) => {
         this.categories = data;
         if (this.categories.length !== 0) {
          this.categories.forEach(cat => {
            this.videos = this.videos.concat(cat.videos);
           });
         }
      }, error => console.log(error));
  }

  getCategory(id) {
    this.service.getVideoCategory(id).subscribe(
      (data: VideoCategory) => {
        this.videos = data.videos;
      }, error => console.log(error)
    );
  }

}
