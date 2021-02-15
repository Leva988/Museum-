import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, transition, style, animate} from '@angular/animations';
import { Service } from './service/service.service';
import { environment } from 'src/environments/environment';
import { ServiceCategory } from '../models/servicecategory';

@Component({
  selector: 'app-business',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  animations: [  trigger('appear', [
    state('initial', style({opacity: '0.1', top: '50px'})),
    state('appeared', style({opacity: '1'})),
    transition('initial <=> appeared', animate('1s')),
  ])
  ],
  providers: [Service]
})

export class ServiceComponent implements OnInit, AfterViewInit {

  services: ServiceCategory[];
  servicesUrl = environment.backendUrl + '/ServiceCategories';
  scrollposition: ScrollLogicalPosition;
  constructor(private busnessService: Service) {

  }

  app = 'initial';
  ngAfterViewInit() {
    setTimeout(_ => this.app = 'appeared', 200);
  }


  ngOnInit() {
    this.refreshServices();
  }

  refreshServices() {
    this.busnessService.getServices(this.servicesUrl).subscribe(
      (data: ServiceCategory[]) => {
        this.services = data;
      },
      error => console.log(error)
    );
  }
}
