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
import { Reward } from 'src/app/models/reward';

declare var $: any;

@Component({
templateUrl: 'reward.admin.component.html',
styleUrls: ['reward.admin.component.scss'],
providers: [AdminComponent]
})
export class RewardAdminComponent implements OnInit {
    rewards: Reward[] = [];
    editReward: Reward = new Reward();
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
        this.getRewards();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Название', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateReward.bind(this),
                    label: 'Изменить',
                    class: 'btn btn-secondary',
                    modal: '#addModal',
                    modalTitle: 'Изменить сотрудника',
                    modalColor: this.modalColor,
                    maxWidth: 100,
                },
                resizable: true
              },
              {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.deleteReward.bind(this),
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

    addReward() {
        this.editReward = new Reward();
        this.modalTitle = 'Добавить награду';
        this.isNewRecord = true;
    }

    updateReward(e) {
        this.editID = e.rowData.id;
        delete e.rowData.id;
        this.editReward = e.rowData;
        this.modalTitle = 'Изменить награду';
        this.isNewRecord = false;
    }

    getRewards() {
         this.repository.getRewards().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Reward[]) => {
                this.rewards = data;
                this.rowData = this.rewards;
              },
            error => console.log(error));
    }

    saveReward(form: NgForm) {
        if (form.valid) {
            if (this.isNewRecord) {
                this.repository.addReward(this.editReward).subscribe(
                    () => {
                        this.modalMessage = `Награда добавлена`;
                        this.modalColor = '#2fc900';
                        this.getRewards();
                        $('#modalMessage').show();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateReward(this.editID, this.editReward).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по награде обновлены`;
                            $('#modalMessage').show();
                            this.getRewards();
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
        this.modalMessage = null;
        this.editReward = new Reward();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteReward(e) {
        if (confirm('Удалить данную награду?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteReward(deleteId).subscribe(
                () => {
                    this.getRewards();
                 },
                 error => {
                    console.log(error);
                   });
        }
     }

    getPhoto(e) {
        this.editID = e.rowData.id;
        if (this.editID === undefined || this.editID === '') {
           this.photo = null;
          } else {
        this.repository.getRewardPhoto(this.editID).subscribe(
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
        this.repository.addRewardPhoto(this.editID, this.fileToUpload).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено';
                this.photo = environment.backendUrl + '/Rewards/' + this.editID + '/Photo';
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
        this.repository.deleteRewardPhoto(this.editID).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Фото  удалено`;
                 this.photo = null;
                 $('#photoMessage').show();
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото отсутствует`;
                this.modalColor = '#f20800';
                $('#photoMessage').show();
               });
     }

}
