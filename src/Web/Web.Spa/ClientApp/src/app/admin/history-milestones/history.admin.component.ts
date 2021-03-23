import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { Achievement } from 'src/app/models/achievement';
import { NgForm } from '@angular/forms';
import { HistoryMilestone } from 'src/app/models/historymilestones';

declare var $: any;

@Component({
templateUrl: 'history.admin.component.html',
styleUrls: ['history.admin.component.scss'],
providers: [AdminComponent]
})
export class HistoryAdminComponent implements OnInit {
    milestones: HistoryMilestone[] = [];
    url = environment.backendUrl + '/HistoryMilestones';
    active: number;
    editMilestone: HistoryMilestone = new HistoryMilestone();
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
        this.getMilestones();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'dateStart', headerName: 'Начало периода', sortable: true, filter: true, resizable: true },
            { field: 'dateEnd', headerName: 'Конец периода', sortable: true, filter: true, resizable: true },
            { field: 'description', headerName: 'Описание', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateMilestone.bind(this),
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
                onClick: this.deleteMilestone.bind(this),
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

    addMilestone() {
        this.editMilestone = new HistoryMilestone();
        this.modalTitle = 'Добавить событие';
        this.isNewRecord = true;
    }

    updateMilestone(e) {
        this.editID = e.rowData.id;
        this.repository.getHistoryMilestone(this.editID).subscribe(
            (data: HistoryMilestone) => {
                this.editMilestone = data;
            }, error => console.error(error)
        );
        this.modalTitle = 'Изменить событие';
        this.isNewRecord = false;
    }

    getMilestones() {
         this.repository.getHistoryMilestones().subscribe(
            (data: HistoryMilestone[]) => {
                for (const d of data) {
                    const localdateStart = new Date(Date.parse(d.dateStart)).getFullYear().toString();
                    const localdateEnd = new Date(Date.parse(d.dateEnd)).getFullYear().toString();
                    d.dateEnd = localdateEnd;
                    d.dateStart = localdateStart;
                }
                this.milestones = data;
                this.rowData = this.milestones;
              },
            error => console.log(error));
    }

    saveMilestone(form: NgForm) {
        if (form.valid) {
        if (this.isNewRecord) {
            this.repository.addHistoryMilestone(this.editMilestone).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Событие добавлено`;
                    this.getMilestones();
                    $('#modalMessage').show();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    $('#modalMessage').show();
                    console.log(error);
                 });
            } else {
                this.repository.updateHistoryMilestone(this.editID, this.editMilestone).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по событию обновлены`;
                        this.getMilestones();
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
        this.editMilestone = new HistoryMilestone();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteMilestone(e) {
        if (confirm('Удалить событие?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteHistoryMilestone(deleteId).subscribe(
                 () => {
                     this.getMilestones();
                  },
                  error => {
                     console.log(error);
                    });
        }
     }

    getPhoto(e) {
        this.photos = [];
        this.editID = e.rowData.id;
        if (isNullOrUndefined(this.editID)) {
            this.photos = [];
          } else {
             this.arrowsHandler(e.rowData.items);
             e.rowData.items.forEach(item => {
                 this.repository.getHistoryPhotoDescription(this.editID, item).subscribe(
                     (data: string) => {
                         const photo = { key: item, value: data};
                         this.photos.push(photo);
                     }, error => console.log(error));
             });
        }
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
            this.repository.addHistoryImage(this.editID, this.fileToUpload).subscribe(
                (data: any) => {
                    this.repository.getHistoryPhotoDescription(this.editID, data.id).subscribe(
                        (desc: string) => {
                            const photo = { key:  data.id, value: desc};
                            this.photos.push(photo);
                            this.arrowsHandler(this.photos);
                        }, error => console.log(error));
                    this.modalColor = '#2fc900';
                    this.modalMessage = 'Фото добавлено';
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
        $('#histCarousel').carousel('next');
        this.repository.deleteHistoryImage(this.editID, photo.key).subscribe(
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
