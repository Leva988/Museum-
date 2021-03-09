import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { AdminComponent } from '../admin.component';
import { Department } from 'src/app/models/department';
import { ButtonRendererComponent } from '../button-renderer.component';
import { KeyValue } from '@angular/common';
import { environment } from 'src/environments/environment';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { isNullOrUndefined } from 'util';


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
    messageTitle: string;
    modalColor: string;
    columnDefs: any[] = [];
    rowData: any[] = [];
    gridOptions: GridOptions;

    constructor(private repository: AdminComponent) {
    }

    ngOnInit() {
        this.getEmployees();
        this.repository.getDepartments().subscribe(
            // tslint:disable-next-line: no-shadowed-variable
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
                    modal: '#modal',
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
        delete e.rowData.id;
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

    saveEmployee() {
        if (isNullOrUndefined(this.editEmployee.departmentId)) {
            this.editEmployee.departmentId = '';
        }
        if (this.editEmployee.name === undefined || this.editEmployee.type === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
            this.messageTitle = 'Ошибка';
        } else {
        if (this.isNewRecord) {
            this.repository.addEmployee(this.editEmployee).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Сотрудник добавлен`;
                    this.getEmployees();
                },
                error => {
                    this.modalMessage = 'Введите верные данные!';
                    this.modalColor = '#f20800';
                    this.messageTitle = 'Ошибка';
                    console.log(error);
                 });
            } else {
                this.repository.updateEmployee(this.editID, this.editEmployee).subscribe(
                    () => {
                        this.modalColor = '#2fc900';
                        this.modalMessage = `Данные по сотруднику обновлены`;
                        this.getEmployees();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        this.messageTitle = 'Ошибка';
                        console.log(error);
                     });
            }
        }
    }

    cancel() {
        this.editEmployee = new Employee();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteEmployee(e) {
        this.modalTitle = 'Удалить сотрудника';
        const deleteId = e.rowData.id;
        this.repository.deleteEmployee(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Сотрудник удалён`;
                this.getEmployees();
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Сотрудник не найден или произошла ошибка!`;
               });
     }

    getPhoto(e) {
        this.editID = e.rowData.id;
        if (this.editID === undefined || this.editID === '') {
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
                this.modalMessage = `Фото отсутствует`;
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
        } else {
        this.repository.addEmployeePhoto(this.editID, this.fileToUpload).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено';
                this.photo = environment.backendUrl + '/Employees/' + this.editID + '/Photo';
            },
            (err) => {
                console.log(err);
                this.modalMessage = `Введите верные данные`;
                this.modalColor = '#f20800';
            }
          );
        }
    }

    deletePhoto() {
        if (this.photo === null || this.photo === undefined) {
            this.modalMessage = 'Фото отсутствует!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteEmployeePhoto(this.editID).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Фото  удалено`;
                 this.photo = null;
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото отсутствует`;
                this.modalColor = '#f20800';
               });
            }
     }

}
