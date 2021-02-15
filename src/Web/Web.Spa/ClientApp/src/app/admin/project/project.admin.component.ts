import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';

declare var $: any;

@Component({
templateUrl: 'project.admin.component.html',
styleUrls: ['project.admin.component.scss'],
providers: [AdminComponent]
})
export class ProjectAdminComponent implements OnInit {
    projects: Project[] = [];
    image: any;
    number: number;
    id: string;
    depId: string;
    serviceId: string;
    name: string;
    description: string;
    depIdPost: string;
    color: string;
    serviceIdPost: string;
    editId: string;
    editName: string;
    editDescription: string;
    editColor: string;
    editDepId: string;
    editServiceId: string;
    deleteId: string;
    imageId: string;
    postImageId: string;
    fileToUpload: File;
    deleteImageId: string;
    postForm: FormGroup;
    modalMessage: string;
    modalTitle: string;
    modalColor: string;

    constructor(private repository: AdminComponent) {
        this.getProjects(2);
    }

    ngOnInit() {
        $('#modal').on('hide.bs.modal', () => {
            this.image = undefined;
          });
    }

    getProjects(i: number) {
        this.repository.getProjects().subscribe(
           // tslint:disable: no-shadowed-variable
           (data: Project[]) => {
               this.projects = data;
               this.projects = this.projects.slice(0 , i);
           },
           error => console.log(error));
   }

   getProject(id: string) {
    this.modalTitle = 'Get Project(id)';
    if (id === undefined || id === '') {
        this.modalMessage = 'Введите id проекта!';
        this.modalColor = '#f20800';
      } else {
    this.repository.getProject(id).subscribe(
        (data: Project) => {
            this.projects = [];
            this.projects.push(data);
            this.modalColor = '#2fc900';
            this.modalMessage = `Проект ${id} выгружен в таблицу`;
        },
        error => {
            console.log(error);
            this.modalColor = '#f20800';
            this.modalMessage = `Проект ${id} не найден!`;
        });
    }
  }

  getbyDepId(depId: string) {
    this.modalTitle = 'Get Project(by Department)';
    if (depId === undefined || depId === '') {
       this.modalMessage = 'Введите id отдела!';
       this.modalColor = '#f20800';
    } else {
    this.repository.getProjectsbyDepartment(depId).subscribe(
       (data: Project[]) => {
           this.projects = [];
           if (data && data.length !== 0) {
           this.projects = data;
           this.modalColor = '#2fc900';
           this.modalMessage = `Проекты отдела ${depId} выгружены в таблицу`;
           } else {
            this.modalColor = '#f20800';
            this.modalMessage = `Отдел Id - ${depId} не найден или не имееет проектов!`;
           }
       },
       error => console.log(error));
    }
  }

  addProject(name: string, description: string, color: string, depId: string, serviceId: string) {
    this.modalTitle = 'Add Project';
    if (name === undefined || description === undefined || depId === undefined || serviceId === undefined) {
        this.modalMessage = 'Введите данные!';
        this.modalColor = '#f20800';
    } else {
    this.repository.addProject(name, description, color, depId, serviceId).subscribe(
        (data: any) => {
            this.modalColor = '#2fc900';
            this.modalMessage = 'Проект добавлен.\n' + `Id - ${data.id}`;
        },
        error => {
            this.modalMessage = 'Введите верные данные!';
            this.modalColor = '#f20800';
            console.log(error);
        });
     }
   }

   updateProject(id: string, name: string, description: string, color: string, depId: string, serviceId: string) {
    this.modalTitle = 'Edit Project';
    if (id === undefined || name === undefined || description === undefined || depId === undefined || serviceId === undefined) {
        this.modalMessage = 'Введите данные!';
        this.modalColor = '#f20800';
    } else {
    if (serviceId === undefined ) {
        serviceId = '';
    }
    this.repository.updateProject(id, name, description, color, depId, serviceId).subscribe(
        (data: any) => {
            this.modalColor = '#2fc900';
            this.modalMessage = `Данные по проекту  ${id} изменены`;
        },
        error => {
            this.modalMessage = 'Введите верные данные!';
            this.modalColor = '#f20800';
            console.log(error);
         });
      }
    }

    deleteProject(deleteId: string) {
        this.modalTitle = 'Delete Project';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id проекта!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteProject(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Проект ${deleteId} удалён`;
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Проект ${deleteId} не найден!`;
               });
            }
     }

    getImage(id: string) {
        this.modalTitle = 'Get Image';
        this.modalColor = '#2fc900';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getProjectImage(id).subscribe(
            (data: Blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    this.image = reader.result;
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Фоновая картинка ${id}`;
                };
            },
            error => {
                console.log(error);
                this.modalMessage = `Картинка ${id} отсутствует`;
                this.modalColor = '#f20800';
            });
        }
        this.image = undefined;
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    addImage(postPhotoId: string) {
        this.modalTitle = 'Add Image';
        if (this.postImageId === undefined || this.postImageId === '' || this.fileToUpload === undefined ) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addProjectImage(postPhotoId, this.fileToUpload).subscribe(
            (response: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Картинка добавлена\n' + `Id  - ${response.id}`;
            },
            (err) => {
                console.log(err);
                this.modalMessage = `Введите верные данные`;
                this.modalColor = '#f20800';
            }
          );
        }
    }

    deleteImage(deleteId: string) {
        this.modalTitle = 'Delete Image';
        if (deleteId === undefined || deleteId === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteProjectImage(deleteId).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Картинка  ${deleteId} удалена`;
             },
             error => {
                console.log(error);
                this.modalMessage = `Картинка  ${deleteId} отсутствует`;
                this.modalColor = '#f20800';
               });
            }
     }

}
