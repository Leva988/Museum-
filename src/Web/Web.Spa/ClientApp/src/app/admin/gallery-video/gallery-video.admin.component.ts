import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { Achievement } from 'src/app/models/achievement';
import { NgForm } from '@angular/forms';
import { AchievementCategory } from 'src/app/models/achievementcategory';
import { GalleryVideo } from 'src/app/models/galleryvideo';

declare var $: any;

@Component({
templateUrl: 'gallery-video.admin.component.html',
styleUrls: ['gallery-video.admin.component.scss'],
providers: [AdminComponent]
})
export class GalleryVideoAdminComponent implements OnInit {
    videos: GalleryVideo[] = [];
    url = environment.backendUrl + '/GalleryVideos';
    active: number;
    editVideo: GalleryVideo = new GalleryVideo();
    editID: string;
    isNewRecord: boolean;
    photo: any;
    fileToUpload: File;
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
        this.getVideos();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Название', sortable: true, filter: true, resizable: true },
            { field: 'url', headerName: 'Ссылка', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateVideo.bind(this),
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
                onClick: this.deleteVideo.bind(this),
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
                    label: 'Превью',
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

    addVideo() {
        this.editVideo = new GalleryVideo();
        this.modalTitle = 'Добавить данные о видео';
        this.isNewRecord = true;
    }

    updateVideo(e) {
        this.editID = e.rowData.id;
        this.editVideo = e.rowData;
        this.modalTitle = 'Изменить данные о видео';
        this.isNewRecord = false;
    }

    getVideos() {
         this.repository.getGalleryVideos().subscribe(
            (data: GalleryVideo[]) => {
                this.videos = data;
                this.rowData = this.videos;
              },
            error => console.log(error));
    }

    saveVideo(form: NgForm) {
        if (form.valid) {
        if (this.isNewRecord) {
            this.repository.addGalleryVideo(this.editVideo).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Данные о видео добавлены`;
                    this.getVideos();
                    $('#modalMessage').show();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    $('#modalMessage').show();
                    console.log(error);
                 });
            } else {
                this.repository.updateGalleryVideo(this.editID, this.editVideo).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по видео обновлены`;
                        this.getVideos();
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
        this.editVideo = new GalleryVideo();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteVideo(e) {
        if (confirm('Удалить данные о видео?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteGalleryVideo(deleteId).subscribe(
                 () => {
                     this.getVideos();
                  },
                  error => {
                     console.log(error);
                    });
        }
     }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    getPhoto(e) {
        this.editID = e.rowData.id;
        if (isNullOrUndefined(this.editID)) {
           this.photo = null;
          } else {
        this.repository.getGalleryVideoPreview(this.editID).subscribe(
            (data: Blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    this.photo = reader.result;
                };
            },
            error => {
                console.log(error);
                this.modalMessage = 'Фото отсутствует!';
                this.modalColor = '#f20800';
                $('#photoMessage').show();
            });
        }
        this.photo = undefined;
    }

    addPhoto() {
        if (isNullOrUndefined(this.fileToUpload)) {
            this.modalMessage = 'Прикрепите файл!';
            this.modalColor = '#f20800';
            $('#photoMessage').show();
        } else {
            this.repository.addGalleryVideoPreview(this.editID, this.fileToUpload).subscribe(
                (data: any) => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = 'Фото добавлено';
                    this.photo = environment.backendUrl + '/GalleryVideos/' + this.editID + '/Photo';
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

    deletePhoto() {
        this.repository.deleteGalleryVideoPreview(this.editID).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Фото  удалено`;
                 this.photo = null;
                 $('#photoMessage').show();
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото отсутствует!`;
                this.modalColor = '#f20800';
                $('#photoMessage').show();
               });
     }

}
