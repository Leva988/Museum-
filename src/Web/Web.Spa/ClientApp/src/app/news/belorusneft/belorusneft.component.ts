import { Component, OnInit } from '@angular/core';
import {FeedService} from '../feedservice/feed-service.service';
import { HttpClient } from '@angular/common/http';
import { Article } from '../model/article';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-belorusneft',
  templateUrl: './belorusneft.component.html',
  styleUrls: ['./belorusneft.component.scss'],
  providers: [FeedService]
})
export class BelorusneftComponent implements OnInit {
  private BelnUrl = environment.proxyBelnUrl;
  articles: Article [];
  constructor(private feedService: FeedService ) {
    this.refreshFeed();
  }

  ngOnInit() {  }

  refreshFeed() {
    this.feedService.getBelnFeeds(this.BelnUrl).subscribe(
      (data: any) => {
          const doc = new DOMParser().parseFromString(data, 'text/html');
          const text = doc.getElementsByTagName('p').item(0).innerText;
          const json = JSON.parse(text);
          const arr = json.articles;
          this.articles = arr.slice(0, 5);
        },
      error => console.log(error));
  }

}
