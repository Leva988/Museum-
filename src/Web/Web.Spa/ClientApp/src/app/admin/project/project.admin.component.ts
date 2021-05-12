import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';

declare var $: any;

@Component({
templateUrl: 'project.admin.component.html',
styleUrls: ['project.admin.component.scss'],
providers: [AdminComponent]
})
export class ProjectAdminComponent implements OnInit {
    projects: Project[] = [];
    url = environment.backendUrl + '/Projects';
    active: number;
    editProject: Project = new Project();
    editID: string;
    isNewRecord: boolean;
    photos: string[] = [];
    filesToUpload: FileList;
    modalMessage: string;
    modalTitle: string;
    messageTitle: string;
    modalColor: string;
    columnDefs: any[] = [];
    rowData: any[] = [];
    gridOptions: GridOptions;

    constructor(private repository: AdminComponent) {
    }

    ngOnInit() {
        $('#modalMessage').hide();
        $('#photoMessage').hide();
        $('#addModal').on('hidden.bs.modal', () => {
            this.modalMessage = this.modalColor = this.modalTitle = null;
            $('#modalMessage').hide();
        });
        $('#modalPhoto').on('hidden.bs.modal', () => {
            this.modalMessage = this.modalColor = this.modalTitle = null;
            $('#photoMessage').hide();
        });
        this.getProjects();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Название', sortable: true, filter: true, resizable: true },
            { field: 'description', headerName: 'Описание', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateProject.bind(this),
                    label: 'Изменить',
                    class: 'btn btn-secondary',
                    modal: '#addModal',
                    maxWidth: 100,
                },
                resizable: true
              },
              {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.deleteProject.bind(this),
                    label: 'Удалить',
                    class: 'btn btn-danger',
                    modal: '',
                    maxWidth: 100
                   },
                resizable: true
               },
               {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.getPhoto.bind(this),
                    label: 'Фото',
                    class: 'btn btn-primary',
                    modal: '#modalPhoto',
                    maxWidth: 100
                   },
                resizable: true
               }
        ];
        this.gridOptions = {
            context: {parentComponent: this},
            frameworkComponents: {
                buttonRenderer: ButtonRendererComponent,
            },
            pagination: true,
            paginationPageSize: 18,
            rowSelection: 'single',
            onGridReady: (ev: GridReadyEvent) => {
                ev.api.sizeColumnsToFit();
            }
           };
    }

    addProject() {
        this.editProject = new Project();
        this.modalTitle = 'Добавить проект';
        this.isNewRecord = true;
    }

    updateProject(e) {
        this.editID = e.rowData.id;
        this.editProject = e.rowData;
        this.modalTitle = 'Изменить проект';
        this.isNewRecord = false;
    }

    getProjects() {
         this.repository.getProjects().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Project[]) => {
                this.projects = data;
                this.rowData = this.projects;
              },
            error => console.log(error));
    }

    saveProject(form: NgForm) {
        if (form.valid) {
        if (this.isNewRecord) {
            this.repository.addProject(this.editProject).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Проект добавлен`;
                    this.getProjects();
                    $('#modalMessage').show();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    $('#modalMessage').show();
                    console.log(error);
                 });
            } else {
                this.repository.updateProject(this.editID, this.editProject).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по проекту обновлены`;
                        this.getProjects();
                        $('#modalMessage').show();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
            }
        } else {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
            $('#modalMessage').show();
        }
    }

    cancel() {
        $('#modalMessage').hide();
        this.editProject = new Project();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteProject(e) {
        if (confirm('Удалить проект?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteProject(deleteId).subscribe(
                 () => {
                     this.getProjects();
                  },
                  error => {
                     console.log(error);
                    });
        }
     }

    handleFileInput(files: FileList) {
        this.filesToUpload = files;
    }

    getPhoto(e) {
       this.editID = e.rowData.id;
       this.repository.getProject(this.editID).subscribe(
           (data: Project) => {
               this.editProject = data;
               this.arrowsHandler( this.editProject.items);
               this.photos =  this.editProject.items;
           }
       );
    }

    savePhoto() {
        if (this.filesToUpload.length === 0) {
            this.modalMessage = 'Прикрепите файл!';
            this.modalColor = '#f20800';
            $('#photoMessage').show();
        } else if (this.allFilesSize() > 200000000 || this.filesToUpload.length > 30) {
            this.modalMessage = 'Общее количество файлов не должно превышать 30,и их суммарный размер должен быть < 200MB!';
            this.modalColor = '#f20800';
            $('#photoMessage').show();
        } else {
            this.repository.addManyProjectImages(this.editID, this.filesToUpload).subscribe(
                (data: any) => {
                   this.photos = this.photos.concat(data.images);
                   this.arrowsHandler(this.photos);
                   this.modalColor = '#2fc900';
                   this.modalMessage = 'Фото добавлены';
                   $('#photoMessage').show();
                },
                (err) => {
                    console.log(err);
                    this.modalMessage = `Введите верные данные`;
                    this.modalColor = '#f20800';
                    $('#photoMessage').show();
                }
              );
        }
    }

    deletePhoto(photo, index) {
        this.photos.splice(index, 1);
        this.arrowsHandler(this.photos);
        $('#projCarousel').carousel('next');
        this.repository.deleteProjectImage(this.editID, photo).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Фото  удалено`;
                $('#photoMessage').show();
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото отсутствует`;
                this.modalColor = '#f20800';
                $('#photoMessage').show();
               });
    }

    arrowsHandler(photos) {
        if (photos.length <= 1) {
            $('#prev').hide();
            $('#next').hide();
        } else {
            $('#prev').show();
            $('#next').show();
        }
    }

    allFilesSize(): number {
        let sum = 0;
        // tslint:disable: prefer-for-of
        for (let i = 0; i < this.filesToUpload.length; i++) {
            sum += this.filesToUpload[i].size;
        }
        return sum;
    }

}
