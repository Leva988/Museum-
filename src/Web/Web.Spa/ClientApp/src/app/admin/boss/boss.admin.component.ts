import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { AdminComponent } from '../admin.component';
import { Department } from 'src/app/models/department';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { NgForm } from '@angular/forms';
import { Boss } from 'src/app/models/boss';

declare var $: any;

@Component({
templateUrl: 'boss.admin.component.html',
styleUrls: ['boss.admin.component.scss'],
providers: [AdminComponent]
})
export class BossAdminComponent implements OnInit {
    bosses: Boss[] = [];
    editBoss: Boss = new Boss();
    editID: string;
    isNewRecord: boolean;
    photo: any;
    fileToUpload: File;
    modalMessage: string;
    modalTitle: string;
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
        this.getBosses();
        this.columnDefs = [
            { field: 'name', headerName: 'ФИО', sortable: true, filter: true, resizable: true },
            { field: 'description', headerName: 'Описание', sortable: true, filter: true, resizable: true},
            { field: 'dateStart', headerName: 'Дата начала руководстваел', sortable: true, filter: true, resizable: true},
            { field: 'dateEnd', headerName: 'Дата окончания руководстваел', sortable: true, filter: true, resizable: true},
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateBoss.bind(this),
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
                onClick: this.deleteEmployee.bind(this),
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
            columnDefs: this.columnDefs,
            rowData: this.rowData,
            pagination: true,
            paginationPageSize: 18,
            rowSelection: 'single',
            onGridReady: (ev: GridReadyEvent) => {
                ev.api.sizeColumnsToFit();
            }
           };

    }

    addBoss() {
        this.editBoss = new Boss();
        this.modalTitle = 'Добавить руководителя';
        this.isNewRecord = true;
    }

    updateBoss(e) {
        this.editID = e.rowData.id;
        this.repository.getBoss(this.editID).subscribe(
            (data: Boss) => {
                this.editBoss = data;
            }, error => console.error(error)
        );
        this.modalTitle = 'Изменить руководителя';
        this.isNewRecord = false;
    }

    getBosses() {
         // tslint:disable: deprecation
         this.repository.getBosses().subscribe(
            (data: Boss[]) => {
                // tslint:disable-next-line: prefer-for-of
                for (let j = 0; j < data.length; j++) {
                    const e = data[j];
                    const dateStart = new Date(e.dateStart).toLocaleDateString();
                    e.dateStart = dateStart;
                    let dateEnd;
                    if (isNullOrUndefined(e.dateEnd)) {
                      e.dateEnd = 'н.в.';
                    } else {
                      dateEnd = new Date(e.dateEnd).toLocaleDateString();
                      e.dateEnd = dateEnd;
                    }
                  }
                this.bosses = data;
                this.rowData = this.bosses;
              },
            error => console.log(error));
    }

    saveBoss(form: NgForm) {
        if (form.valid) {
            if (this.editBoss.dateEnd === '' || isNullOrUndefined(this.editBoss.dateEnd)) {
                delete this.editBoss.dateEnd;
            }
            if (this.isNewRecord) {
                this.repository.addBoss(this.editBoss).subscribe(
                    () => {
                        this.modalMessage = `Руководитель добавлен`;
                        this.modalColor = '#2fc900';
                        $('#modalMessage').show();
                        this.getBosses();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateBoss(this.editID, this.editBoss).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по руководителю обновлены`;
                            $('#modalMessage').show();
                            this.getBosses();
                        },
                        error => {
                            this.modalMessage = 'Введите верные данные!';
                            this.modalColor = '#f20800';
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
        this.modalMessage = null;
        $('#modalMessage').hide();
        this.editBoss = new Boss();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteEmployee(e) {
        if (confirm('Удалить данного руководителя?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteBoss(deleteId).subscribe(
                () => {
                    this.getBosses();
                 },
                 error => {
                    console.log(error);
                   });
        }
     }

    getPhoto(e) {
        this.editID = e.rowData.id;
        if (isNullOrUndefined(this.editID)) {
           this.photo = null;
          } else {
        this.repository.getBossPhoto(this.editID).subscribe(
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

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    addPhoto() {
        if (isNullOrUndefined(this.fileToUpload)) {
            this.modalMessage = 'Прикрепите файл!';
            this.modalColor = '#f20800';
            $('#photoMessage').show();
        } else {
        this.repository.addBossPhoto(this.editID, this.fileToUpload).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено';
                this.photo = environment.backendUrl + '/Bosses/' + this.editID + '/Photo';
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
        this.repository.deleteBossPhoto(this.editID).subscribe(
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
