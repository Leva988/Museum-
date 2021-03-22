import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { NgForm } from '@angular/forms';
import { Gallery } from 'src/app/models/gallery';
import { GalleryCategory } from 'src/app/models/galleryCategory';

declare var $: any;

@Component({
templateUrl: 'gallery.admin.component.html',
styleUrls: ['gallery.admin.component.scss'],
providers: [AdminComponent]
})
export class GalleryAdminComponent implements OnInit {
    galleries: Gallery[] = [];
    categories: GalleryCategory[] = [];
    url = environment.backendUrl + '/Galleries';
    active: number;
    editGallery: Gallery = new Gallery();
    editID: string;
    isNewRecord: boolean;
    photos: KeyValue<string, string>[] = [];
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
        // tslint:disable: deprecation
        this.repository.getGalleryCategories().subscribe(
            (data: GalleryCategory[]) => {
                this.categories = data;
            }, error => console.log(error)
        );
        this.getGalleries();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Название', sortable: true, filter: true, resizable: true },
            { field: 'date', headerName: 'Дата', sortable: true, filter: true, resizable: true },
            { field: 'category', headerName: 'Категория', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateGallery.bind(this),
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
                onClick: this.deleteGallery.bind(this),
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

    addGallery() {
        this.editGallery = new Gallery();
        this.modalTitle = 'Добавить галерею';
        this.isNewRecord = true;
    }

    updateGallery(e) {
        this.editID = e.rowData.id;
        this.repository.getGallery(this.editID).subscribe(
            (data: Gallery) => {
                this.editGallery = data;
            }, error => console.error(error)
        );
        this.modalTitle = 'Изменить галерею';
        this.isNewRecord = false;
    }

    getGalleries() {
         this.repository.getGalleries().subscribe(
            (data: Gallery[]) => {
                // tslint:disable: prefer-for-of
                for (let j = 0; j < data.length; j++) {
                    const e = data[j];
                    const date = new Date(e.date).toLocaleDateString();
                    e.date = date;
                  }
                this.galleries = data;
                this.rowData = this.galleries;
              },
            error => console.log(error));
    }

    saveGallery(form: NgForm) {
        if (form.valid) {
        if (this.isNewRecord) {
            this.repository.addGallery(this.editGallery).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Галерея добавлена`;
                    this.getGalleries();
                    $('#modalMessage').show();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    $('#modalMessage').show();
                    console.log(error);
                 });
            } else {
                this.repository.updateGallery(this.editID, this.editGallery).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по галерее обновлены`;
                        this.getGalleries();
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
        this.editGallery = new Gallery();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteGallery(e) {
        if (confirm('Удалить галерею?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteGallery(deleteId).subscribe(
                 () => {
                     this.getGalleries();
                  },
                  error => {
                     console.log(error);
                    });
        }
     }

    getPhoto(e) {
        this.photos = e.rowData.items;
        this.editID = e.rowData.id;
        this.arrowsHandler(this.photos);
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    savePhoto() {
        if (isNullOrUndefined(this.fileToUpload)) {
            this.modalMessage = 'Прикрепите файл!';
            this.modalColor = '#f20800';
            $('#photoMessage').show();
        } else {
            this.repository.addGalleryPhoto(this.editID, this.fileToUpload).subscribe(
                (data: any) => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = 'Фото добавлено';
                    this.photos.push(data.id);
                    this.arrowsHandler(this.photos);
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
        $('#galCarousel').carousel('next');
        this.repository.deleteGalleryPhoto(this.editID, photo).subscribe(
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

}