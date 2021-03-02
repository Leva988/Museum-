import { Component,  OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { KeyValue } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-gallery-video',
  templateUrl: './gallery-video.component.html',
  styleUrls: ['./gallery-video.component.scss'],
  providers: [GalleryService]
})

export class GalleryVideoComponent implements OnInit {

  videoUrls: KeyValue<string, string>[] = [];
  constructor() {
    this.videoUrls = [
      {
        key: 'БГПЗ - История(1976-2016) полная версия',
        value: '/BGPZ_2016_1080_23.98p.mp4'
      },
      {
        key: 'БГПЗ - История(1976-2016)',
        value: '/BGPZ_2016_1080_23.98p_SHORT.mp4'
      }
    ];
   }

  ngOnInit() {
  }
}
