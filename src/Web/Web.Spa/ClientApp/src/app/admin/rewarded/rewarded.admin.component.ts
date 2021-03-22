import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';
import { NgForm } from '@angular/forms';
import { RewardedEmployee } from 'src/app/models/rewardedemployee';
import { Reward } from 'src/app/models/reward';
import { RewardedEmployeeNew } from 'src/app/models/rewardedemployeeNew';
import { RewardWithYear } from 'src/app/models/rewardwithYear';
declare var $: any;

@Component({
templateUrl: 'rewarded.admin.component.html',
styleUrls: ['rewarded.admin.component.scss'],
providers: [AdminComponent]
})
export class RewardedAdminComponent implements OnInit {
    employees: RewardedEmployee[] = [];
    editEmployee: RewardedEmployeeNew = new RewardedEmployeeNew();
    regions: KeyValue<string, string>[];
    types: KeyValue<string, string>[];
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
    rewards: KeyValue<string, string>[] = [];

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
        this.getEmployees();
        // tslint:disable: deprecation
        this.repository.getRewards().subscribe(
            (data: Reward[]) => {
                data.forEach(d => {
                    this.rewards.push({key: d.id, value: d.name});
                });
            }, error => console.log(error)
        );
        this.columnDefs = [
            { field: 'name', headerName: 'ФИО', sortable: true, filter: true, resizable: true },
            { field: 'position', headerName: 'Должность', sortable: true, filter: true, resizable: true},
            { field: 'dateBirth', headerName: 'Дата рождения', sortable: true, filter: true, resizable: true},
            { field: 'dateStart', headerName: 'Дата принятия на работу', sortable: true, filter: true, resizable: true},
            { field: 'dateEnd', headerName: 'Дата увольнения', sortable: true, filter: true, resizable: true},
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateEmployee.bind(this),
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

    addEmployee() {
        this.editEmployee = new RewardedEmployeeNew();
        this.editEmployee.rewards = [];
        this.editEmployee.rewards.push(new RewardWithYear());
        this.modalTitle = 'Добавить сотрудника';
        this.isNewRecord = true;
    }

    addReward(rews: RewardWithYear[]) {
        rews.push(new RewardWithYear());
    }

    removeReward(rews: RewardWithYear[], index: number) {
        rews.splice(index, 1);
    }

    updateEmployee(e) {
        this.editID = e.rowData.id;
        this.repository.getRewardedEmployee(this.editID).subscribe(
            (data: RewardedEmployeeNew) => {
                this.editEmployee = data;
            }, error => console.error(error)
        );
        this.modalTitle = 'Изменить сотрудника';
        this.isNewRecord = false;
    }

    getEmployees() {
         this.repository.getRewardedEmployees().subscribe(
            (data: RewardedEmployee[]) => {
                // tslint:disable-next-line: prefer-for-of
                for (let j = 0; j < data.length; j++) {
                  const e = data[j];
                  const datebirth = new Date(e.dateBirth).toLocaleDateString();
                  const dateStart = new Date(e.dateStart).toLocaleDateString();
                  e.dateBirth = datebirth;
                  e.dateStart = dateStart;
                  let dateEnd;
                  if (isNullOrUndefined(e.dateEnd)) {
                    e.dateEnd = 'н.в.';
                  } else {
                    dateEnd = new Date(e.dateEnd).toLocaleDateString();
                    e.dateEnd = dateEnd;
                  }
                  e.rewards.forEach(r => {
                    const dateReward = new Date(r.dateReward).toLocaleDateString();
                    r.dateReward = dateReward;
                  });
                }
                this.employees = data;
                this.rowData = this.employees;
              },
            error => console.log(error));
    }

    saveEmployee(form: NgForm) {
        if (form.valid) {
            if (this.isNewRecord) {
                this.repository.addRewardedEmployee(this.editEmployee).subscribe(
                    () => {
                        this.modalMessage = `Сотрудник добавлен`;
                        this.modalColor = '#2fc900';
                        this.getEmployees();
                        $('#modalMessage').show();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateRewardedEmployee(this.editID, this.editEmployee).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по сотруднику обновлены`;
                            this.getEmployees();
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
        this.modalMessage = null;
        this.editEmployee = new RewardedEmployeeNew();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteEmployee(e) {
        if (confirm('Удалить данного сотрудника?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteRewardedEmployee(deleteId).subscribe(
                () => {
                    this.getEmployees();
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
        this.repository.getRewardedEmployeePhoto(this.editID).subscribe(
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
        this.repository.addRewardedEmployeePhoto(this.editID, this.fileToUpload).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено';
                this.photo = environment.backendUrl + '/RewardedEmployees/' + this.editID + '/Photo';
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
        this.repository.deleteRewardedEmployeePhoto(this.editID).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Фото  удалено`;
                 this.photo = null;
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото отсутствует`;
                this.modalColor = '#f20800';
                $('photoMessage').show();
               });
     }

}
