import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialService } from './social-service/social-service.service';
import { FaConfig,  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SocialCategory } from '../models/socialcategory';

declare var $: any;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  providers: [SocialService, FaConfig, FaIconLibrary]
})
export class SocialComponent implements OnInit  {
  title = 'КАЛЕНДАРЬ СОБЫТИЙ  2020 ГОДА';
  categories: SocialCategory[] = [];
  photo = '';
  cat: SocialCategory = new SocialCategory();
  socialUrl = environment.backendUrl + '/SocialCategories';
  constructor(private socialService: SocialService)  {
  }

  ngOnInit() {
    this.refreshCategories();
  }

  refreshCategories() {
    this.socialService.getCategories(this.socialUrl).subscribe(
      (data: SocialCategory[]) => {
        // tslint:disable: prefer-for-of
        this.categories = data;
        console.log(this.categories);
        },
       error => console.log(error));
      }

}
