import { Component,  OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { Observable } from 'rxjs';
import { GalleryVideo } from 'src/app/models/galleryvideo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-video',
  templateUrl: './gallery-video.component.html',
  styleUrls: ['./gallery-video.component.scss'],
  providers: [GalleryService]
})

export class GalleryVideoComponent implements OnInit {

  videos: Observable<GalleryVideo[]>;
  videoUrl = environment.backendUrl + '/GalleryVideos';
  constructor(private service: GalleryService) {
   }

  ngOnInit() {
    this.getGalleryVideos();
  }

  getGalleryVideos() {
    this.videos = this.service.getVideos();
  }


}
