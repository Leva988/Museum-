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
import { CorporateMonth } from 'src/app/models/corporatemonth';
import { CorporateYear } from 'src/app/models/corporateyear';

declare var $: any;

@Component({
templateUrl: 'corporate-month.admin.component.html',
styleUrls: ['corporate-month.admin.component.scss'],
providers: [AdminComponent]
})
export class CorporateMonthAdminComponent implements OnInit {
    months: CorporateMonth[] = [];
    years: CorporateYear[] = [];
    url = environment.backendUrl + '/CorporateMonths';
    active: number;
    editMonth: CorporateMonth = new CorporateMonth();
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
        this.repository.getCorporateYears().subscribe(
            (data: CorporateYear[]) => {
                this.years = data;
            }, error => console.log(error)
        );
        this.getMonths();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Месяц', sortable: true, filter: true, resizable: true },
            { field: 'description', headerName: 'Описание', sortable: true, filter: true, resizable: true },
            { field: 'year', headerName: 'Год', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateMonth.bind(this),
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
                onClick: this.deleteMonth.bind(this),
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

    addMonth() {
        this.editMonth = new CorporateMonth();
        this.modalTitle = 'Добавить месяц';
        this.isNewRecord = true;
    }

    updateMonth(e) {
        this.editID = e.rowData.id;
        this.editMonth = e.rowData;
        this.modalTitle = 'Изменить месяц';
        this.isNewRecord = false;
    }

    getMonths() {
         this.repository.getMonths().subscribe(
            (data: CorporateMonth[]) => {
                this.months = data;
                this.rowData = this.months;
              },
            error => console.log(error));
    }

    saveMonth(form: NgForm) {
        if (form.valid) {
        if (this.isNewRecord) {
            this.repository.addCorporateMonth(this.editMonth).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Месяц добавлен`;
                    this.getMonths();
                    $('#modalMessage').show();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    $('#modalMessage').show();
                    console.log(error);
                 });
            } else {
                this.repository.updateCorporateMonth(this.editID, this.editMonth).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по месяцу обновлены`;
                        this.getMonths();
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
        this.editMonth = new CorporateMonth();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteMonth(e) {
        if (confirm('Удалить месяц?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteCorporateMonth(deleteId).subscribe(
                 () => {
                     this.getMonths();
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
            this.repository.addCorporatePhoto(this.editID, this.fileToUpload).subscribe(
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
        $('#corpCarousel').carousel('next');
        this.repository.deleteCorporatePhoto(this.editID, photo).subscribe(
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
