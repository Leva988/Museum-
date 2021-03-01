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

  videoUrls: KeyValue<string, SafeUrl>[] = [];
  constructor(private sanitization: DomSanitizer) {
    this.videoUrls = [{
      key: 'БГПЗ - История(1976-2016) полная версия',
      value: 'file:///C:/src/video/BGPZ_2016_1080_23.98p.mpeg'
    },
      {
        key: 'БГПЗ - История(1976-2016)',
        value: 'file:///C:/src/video/BGPZ_2016_1080_23.98p_SHORT.mpeg'
      }
    ];
   }

  ngOnInit() {
  }

}
