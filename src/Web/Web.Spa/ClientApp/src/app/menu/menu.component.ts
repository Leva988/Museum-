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
  constructor() {
    this.history = [
      // {key: '/historyref', value: 'Историческая справка'},
      // {key: '/historydates', value: 'Важные даты'},
      {key: '/historyveterans', value: 'Ветераны'},
    ];
  }

  hvisibility = true;

  ngOnInit() {
  }

  historyclick() {
    this.hvisibility = !this.hvisibility;
  }
}
