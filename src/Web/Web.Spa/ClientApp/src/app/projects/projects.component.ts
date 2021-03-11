import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProjectService } from './project-service/project-service.service';
import { environment } from 'src/environments/environment';
import { ViewEncapsulation } from '@angular/core';
import { Project } from '../models/project';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {
  @ViewChildren('anchors') anchors;
  projects: Project[] = [];
  project: Project = new Project();
  url = environment.backendUrl + '/Projects';

  // tslint:disable:max-line-length
  constructor(private projectService: ProjectService,  private sanitizer: DomSanitizer) {
   }

   ngOnInit() {
    this.refreshProjects();
  }

  projectClick(project: Project) {
    this.project = project;
    $('#Modal').modal('show');
  }

  refreshProjects() {
    // tslint:disable: deprecation
    this.projectService.getProjects(this.url).subscribe({
      next: (data: Project []) => {
        this.projects = data;
        },
      error: (err) => console.log(err)
     });
  }

}
