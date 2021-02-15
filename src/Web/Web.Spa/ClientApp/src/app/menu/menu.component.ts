import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  title = 'Музей СИС';
  history: KeyValue<string, string>[];
  gallery: KeyValue<string, string>[];
  constructor() {
    this.history = [{key: '/historyref', value: 'Историческая справка'},
    {key: '/historydates', value: 'Важные даты'},
    {key: '/historyveterans', value: 'Ветераны'}];
   }
  gvisibility = true;
  hvisibility = true;
  ngOnInit() {
    // tslint:disable:variable-name
    // tslint:disable:only-arrow-functions

    }
  galleryclick() {
    this.gvisibility = !this.gvisibility;
   }
   historyclick() {
    this.hvisibility = !this.hvisibility;
   }
}
