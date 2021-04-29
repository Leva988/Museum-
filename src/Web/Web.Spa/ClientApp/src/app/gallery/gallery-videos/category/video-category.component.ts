import { Component, Input, OnInit } from '@angular/core';
import { faPhotoVideo, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { GalleryVideo } from 'src/app/models/galleryvideo';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-video-category',
  templateUrl: './video-category.component.html',
  styleUrls: ['./video-category.component.scss'],
  providers: [FaConfig, FaIconLibrary]
})

export class VideoCategoryComponent implements OnInit {

  faVideo = faVideo;
  video: GalleryVideo = new GalleryVideo();
  videoUrl = environment.backendUrl + '/GalleryVideos';
  // tslint:disable-next-line: variable-name
  _videos: GalleryVideo[] = [];
  @Input()
  set videos(videos: GalleryVideo[]) {
    // tslint:disable: prefer-for-of
    for (let i = 0; i < videos.length; i++) {
      const d = videos[i];
      const date = new Date(Date.parse(d.date));
      const local = date.toLocaleDateString(undefined);
      d.date = local;
    }
    this._videos = videos;
  }
  get videos() { return this._videos; }

  constructor(private http: HttpClient) {
   }

   ngOnInit() {
  }


}
