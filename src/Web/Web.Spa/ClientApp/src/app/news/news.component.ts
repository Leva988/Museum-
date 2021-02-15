import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [  ]
})

export class NewsComponent implements OnInit  {

  title = 'Новости';
  constructor( ) {
  }

  ngOnInit() {
   }

 }
