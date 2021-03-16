import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { Achievement } from 'src/app/models/achievement';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
templateUrl: 'achievement.admin.component.html',
styleUrls: ['achievement.admin.component.scss'],
providers: [AdminComponent]
})
export class AchievementAdminComponent implements OnInit {
    achievements: Achievement[] = [];
    url = environment.backendUrl + '/Achievements';
    active: number;
    editAchievement: Achievement = new Achievement();
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
        $('#addModal').on('hidden.bs.modal', () => {
            this.modalMessage = this.modalColor = this.modalTitle = null;
        });
        $('#modalPhoto').on('hidden.bs.modal', () => {
            this.modalMessage = this.modalColor = this.modalTitle = null;
        });
        this.getAchievements();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Достижение', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateAchievement.bind(this),
                    label: 'Изменить',
                    class: 'btn btn-secondary',
                    modal: '#addModal',
                    modalTitle: 'Изменить достижение',
                    modalColor: this.modalColor,
                    maxWidth: 100,
                },
                resizable: true
              },
              {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.deleteAchievement.bind(this),
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

    addAchievement() {
        this.editAchievement = new Achievement();
        this.modalTitle = 'Добавить достижение';
        this.isNewRecord = true;
    }

    updateAchievement(e) {
        this.editID = e.rowData.id;
        delete e.rowData.id;
        this.editAchievement = e.rowData;
        this.modalTitle = 'Изменить достижение';
        this.isNewRecord = false;
    }

    getAchievements() {
         this.repository.getAchievements().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Achievement[]) => {
                this.achievements = data;
                this.rowData = this.achievements;
              },
            error => console.log(error));
    }

    saveAchievement(form: NgForm) {
        if (form.valid) {
        if (this.isNewRecord) {
            this.repository.addAchievement(this.editAchievement).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Достижение добавлено`;
                    this.getAchievements();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    console.log(error);
                 });
            } else {
                this.repository.updateAchievement(this.editID, this.editAchievement).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по достижению обновлены`;
                        this.getAchievements();
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
        }
    }

    cancel() {
        this.editAchievement = new Achievement();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteAchievement(e) {
        if (confirm('Удалить достижение?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteAchievement(deleteId).subscribe(
                 () => {
                     this.getAchievements();
                  },
                  error => {
                     console.log(error);
                     this.modalColor = '#f20800';
                     this.modalMessage = `Достижение не найдено или произошла ошибка!`;
                    });
        }
     }

    getPhoto(e) {
        this.photos = [];
        this.editID = e.rowData.id;
        if (this.editID === undefined || this.editID === '') {
           this.photos = null;
          } else {
            e.rowData.items.forEach(item => {
                this.repository.getAchPhotoDescription(this.editID, item).subscribe(
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
        } else {
            this.repository.addAchievementImage(this.editID, this.fileToUpload).subscribe(
                (data: any) => {
                    this.repository.getAchPhotoDescription(this.editID, data.id).subscribe(
                        (desc: string) => {
                            const photo = { key:  data.id, value: desc};
                            this.photos.push(photo);
                        }, error => console.log(error));
                    this.modalColor = '#2fc900';
                    this.modalMessage = 'Фото добавлено';
                    this.getAchievements();
                },
                (err) => {
                    console.log(err);
                    this.modalMessage = `Введите верные данные`;
                    this.modalColor = '#f20800';
                }
              );
        }
    }

    deletePhoto(photo) {
        console.log(photo);
        this.repository.deleteAchievementImage(this.editID, photo.key).subscribe(
            () => {
                for (let i = 0; i < this.photos.length; i++) {
                     if ( this.photos[i] === photo) {
                    this.photos.splice(i, 1);
                    i--;
                    }
                 }
                this.modalColor = '#2fc900';
                this.modalMessage = `Фото  удалено`;
                this.getAchievements();
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото отсутствует`;
                this.modalColor = '#f20800';
               });
    }

}
