import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  title = 'Музей БГПЗ';
  history: KeyValue<string, string>[];
  gallery: KeyValue<string, string>[];
  constructor() {
    this.history = [
      {key: '/historymilestones', value: 'Вехи истории'},
      {key: '/historyrewarded', value: 'Награжденные ведомственными и государственными наградами'},
      {key: '/historybosses', value: 'Наши руководители'},
    ];
    this.gallery = [
      { key: '/galleryvideos/category/all', value: 'Видео'},
      { key: '/galleryphotos/category/all', value: 'Фото'}
    ];
  }

  hvisibility = true;
  gvisibility = true;

  ngOnInit() {
  }

  historyclick() {
    this.hvisibility = !this.hvisibility;
  }

  galleryclick() {
    this.gvisibility = !this.gvisibility;
  }
}
