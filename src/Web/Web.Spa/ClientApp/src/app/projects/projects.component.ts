import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProjectService } from './project-service/project-service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../models/service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  @ViewChildren('anchors') anchors;
  services: Service[] = [];
  title: string;
  description: string;
  url = environment.backendUrl + '/Projects';
  serviceUrl = environment.backendUrl + '/Services';
  fragment;
  // tslint:disable:max-line-length
  constructor(private projectService: ProjectService,  private route: ActivatedRoute) {
   }

   ngOnInit() {
    this.refreshProjects();
  }

   anchor() {
      const interval = setInterval(() => {
      const elem = document.getElementById(this.fragment);
      if (elem) {
          elem.scrollIntoView({behavior: 'smooth'});
          clearInterval(interval);
       }
      }, 1000);
   }

  refreshProjects() {
    this.projectService.getServices(this.serviceUrl).subscribe(
      (data: Service []) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.length; i++) {
          if (data[i].projects.length !== 0) {
            this.services.push(data[i]);
          }
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.services.length; i++) {
          this.services[i].name = this.services[i].name.charAt(0).toUpperCase() + this.services[i].name.slice(1);
        }
        this.route.fragment.subscribe(fragment => {
          this.fragment = fragment;
         });
        this.anchor();
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => (console.log(error))
    );
  }

}
