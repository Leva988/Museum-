import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {FeedService} from '../feedservice/feed-service.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Neft } from '../model/neft';
import { NeftFeed } from '../model/neft.feed';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main-feed',
  templateUrl: './neft.by.component.html',
  styleUrls: ['./neft.by.component.scss'],
  providers : [FeedService]
})
export class NeftByComponent implements OnInit {
   // private proxyNeftUrl = '/backend/newsneftby/category';
   private AZSurl = environment.proxyNeftUrl + '/azs';
   // tslint:disable: variable-name
   azs_feeds: NeftFeed[] = [];
   private Nefturl = environment.proxyNeftUrl + '/neft';
   neft_feeds: NeftFeed[] = [];
   private Socialurl = environment.proxyNeftUrl + '/society';
   social_feeds: NeftFeed[] = [];
   feed: Neft ;
  constructor(private http: HttpClient, private feedService: FeedService) {
    this.refreshFeed();
  }
  ngOnInit() {    }
  private refreshFeed() {
    // AZS
    this.feedService.getFeeds(this.AZSurl).subscribe(
      data => {
      const convert = require('xml-js');
      this.feed = JSON.parse(convert.xml2json(data, {compact: true, spaces: 4}));
      this.azs_feeds = this.feed.rss.channel.item;
    },
      error => console.log(error));
    // Neft
    this.feedService.getFeeds(this.Nefturl).subscribe(
        data  => {
        const convert = require('xml-js');
        this.feed = JSON.parse(convert.xml2json(data, {compact: true, spaces: 4}));
        this.neft_feeds = this.feed.rss.channel.item;
      },
        error => console.log(error));
    // Society
    this.feedService.getFeeds(this.Socialurl).subscribe(
          data => {
          const convert = require('xml-js');
          const json = convert.xml2json(data, {compact: true, spaces: 4});
          this.feed = JSON.parse(json);
          this.social_feeds = this.feed.rss.channel.item;
        },
          error => console.log(error));
  }

 }
