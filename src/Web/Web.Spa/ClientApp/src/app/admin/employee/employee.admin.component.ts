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

declare var $: any;

@Component({
templateUrl: 'employee.admin.component.html',
styleUrls: ['employee.admin.component.scss'],
providers: [AdminComponent]
})
export class EmployeeAdminComponent implements OnInit {
    employees: Employee[] = [];
    editEmployee: Employee = new Employee();
    departments: Department[] = [];
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
        this.repository.getDepartments().subscribe(
            (data: Department[]) => {
                this.departments = data;
            },
            error => console.log(error));
        this.types = [{key: 'boss', value: 'Начальник'}, {key: 'employee', value: 'Обычный сотрудник'}];
        this.columnDefs = [
            { field: 'name', headerName: 'ФИО', sortable: true, filter: true, resizable: true },
            { field: 'position', headerName: 'Должность', sortable: true, filter: true, resizable: true},
            { field: 'department', headerName: 'Отдел', sortable: true, filter: true, resizable: true},
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateEmployee.bind(this),
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
        this.editEmployee = new Employee();
        this.modalTitle = 'Добавить сотрудника';
        this.isNewRecord = true;
    }

    updateEmployee(e) {
        this.editID = e.rowData.id;
        this.editEmployee = e.rowData;
        this.modalTitle = 'Изменить сотрудника';
        this.isNewRecord = false;
    }

    getEmployees() {
         this.repository.getEmployees().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Employee[]) => {
                this.employees = data;
                this.rowData = this.employees;
              },
            error => console.log(error));
    }

    saveEmployee(form: NgForm) {
        if (form.valid) {
            if (isNullOrUndefined(this.editEmployee.departmentId)) {
                this.editEmployee.departmentId = '';
            }
            if (this.isNewRecord) {
                this.repository.addEmployee(this.editEmployee).subscribe(
                    () => {
                        this.modalMessage = `Сотрудник добавлен`;
                        this.modalColor = '#2fc900';
                        $('#modalMessage').show();
                        this.getEmployees();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateEmployee(this.editID, this.editEmployee).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по сотруднику обновлены`;
                            $('#modalMessage').show();
                            this.getEmployees();
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
        this.editEmployee = new Employee();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteEmployee(e) {
        if (confirm('Удалить данного сотрудника?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteEmployee(deleteId).subscribe(
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
        if (isNullOrUndefined(this.editID)) {
           this.photo = null;
          } else {
        this.repository.getEmployeePhoto(this.editID).subscribe(
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
        this.repository.addEmployeePhoto(this.editID, this.fileToUpload).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено';
                this.photo = environment.backendUrl + '/Employees/' + this.editID + '/Photo';
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
        this.repository.deleteEmployeePhoto(this.editID).subscribe(
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
