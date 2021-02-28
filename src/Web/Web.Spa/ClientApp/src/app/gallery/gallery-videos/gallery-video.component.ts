import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { GalleryService } from '../galleryservice/gallery-service.service';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { KeyValue } from '@angular/common';

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
    this.videoUrls = [{
      key: 'БГПЗ - История(1976-2016) полная версия',
      value: 'https://ssl.belorusneft.by/cdn/bgpz/BGPZ_2016_1080_23.98p.mp4'},
      {
        key: 'БГПЗ - История(1976-2016)',
        value: 'https://ssl.belorusneft.by/cdn/bgpz/BGPZ_2016_1080_23.98p_SHORT.mp4'
      }
    ];
   }

  ngOnInit() {

  }

}
