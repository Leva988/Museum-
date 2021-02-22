import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { GalleryService } from './galleryservice/gallery-service.service';
import { environment } from 'src/environments/environment';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Gallery } from '../models/gallery';
import { KeyValue } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [GalleryService, FaConfig, FaIconLibrary]
})

export class GalleryComponent implements OnInit {

  videoUrls: KeyValue<string, string>[] = [];
  constructor() {
    this.videoUrls = [{
      key: 'БГПЗ - История(1976-2016) полная версия',
      value: 'https://ssl.belorusneft.by/cdn/bgpz/BGPZ_2016_1080_23.98p.mp4'},
      {
        key: 'БГПЗ - История(1976-2016)',
        value: 'https://ssl.belorusneft.by/cdn/bgpz/BGPZ_2016_1080_23.98p_SHORT.mp4'
      },
      {
        key: 'БГПЗ - История(1976-2016) реж. версия',
        value: 'https://ssl.belorusneft.by/cdn/bgpz/BGPZ_2016_1080_23.98p_WO_DIRECTOR.mp4'
      }
    ];
   }

  ngOnInit() {

  }

}
