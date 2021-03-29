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
import { Structure } from 'src/app/models/structure';
import { Sector } from 'src/app/models/sector';

declare var $: any;

@Component({
templateUrl: 'department.admin.component.html',
styleUrls: ['department.admin.component.scss'],
providers: [AdminComponent]
})
export class DepartmentAdminComponent implements OnInit {
    editDepartment: Department = new Department();
    structures: Structure[] = [];
    departments: Department[] = [];
    sectors: Sector[] = [];
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
        this.getDepartments();
        // tslint:disable: deprecation
        this.repository.getStructure().subscribe(
            (data: Structure[]) => {
                this.structures = data;
            },
            error => console.log(error));
        this.columnDefs = [
            { field: 'name', headerName: 'Название', sortable: true, filter: true, resizable: true },
            { field: 'shortName', headerName: 'Сокращённое название', sortable: true, filter: true, resizable: true },
            { field: 'description', headerName: 'Описание', sortable: true, filter: true, resizable: true},
            { field: 'employeesNumber', headerName: 'Число сотрудников', sortable: true, filter: true, resizable: true},
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateDepartment.bind(this),
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
                onClick: this.deleteDepartment.bind(this),
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

    addDepartment() {
        this.editDepartment = new Department();
        this.sectors = [];
        this.modalTitle = 'Добавить отдел';
        this.isNewRecord = true;
    }

    updateDepartment(e) {
        this.sectors = [];
        this.editID = e.rowData.id;
        this.editDepartment = e.rowData;
        if (this.editDepartment.sectors.length !== 0) {
            this.editDepartment.sectors.forEach( s =>
                this.sectors.push({name: s})
            );
        }
        delete this.editDepartment.employeesNumber;
        this.modalTitle = 'Изменить отдел';
        this.isNewRecord = false;
    }

    addSector(sectors: Sector[]) {
        const newsect = new Sector();
        sectors.push(newsect);
    }

    removeSector(sectors: Sector[], index: number) {
        sectors.splice(index, 1);
    }

    getDepartments() {
         this.repository.getDepartments().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Department[]) => {
                this.departments = data;
                this.rowData = this.departments;
              },
            error => console.log(error));
    }

    saveDepartment(form: NgForm) {
        if (form.valid) {
            this.editDepartment.sectors = [];
            this.sectors.forEach (s => {
                this.editDepartment.sectors.push(s.name);
             }
            );
            if (this.isNewRecord) {
                this.repository.addDepartment(this.editDepartment).subscribe(
                    () => {
                        this.modalMessage = `Отдел добавлен`;
                        this.modalColor = '#2fc900';
                        console.log(this.editDepartment);
                        $('#modalMessage').show();
                        this.getDepartments();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateDepartment(this.editID, this.editDepartment).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по отделу обновлены`;
                            console.log(this.editDepartment);
                            $('#modalMessage').show();
                            this.getDepartments();
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
        this.editDepartment = new Department();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteDepartment(e) {
        if (confirm('Удалить данный отдел?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteDepartment(deleteId).subscribe(
                () => {
                    this.getDepartments();
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
        this.repository.getDepartmentPhoto(this.editID).subscribe(
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
        this.repository.addDepartmentPhoto(this.editID, this.fileToUpload).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено';
                this.photo = environment.backendUrl + '/Departments/' + this.editID + '/Photo';
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
        this.repository.deleteDepartmentPhoto(this.editID).subscribe(
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
