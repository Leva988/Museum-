import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProjectService } from './project-service/project-service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  @ViewChildren('anchors') anchors;
  projects: Project[] = [];
  project: Project = new Project();
  url = environment.backendUrl + '/Projects';

  // tslint:disable:max-line-length
  constructor(private projectService: ProjectService,  private route: ActivatedRoute) {
   }

   ngOnInit() {
    this.refreshProjects();
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
