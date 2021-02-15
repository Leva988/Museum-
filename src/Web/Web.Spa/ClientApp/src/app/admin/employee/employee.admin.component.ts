import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';

declare var $: any;

@Component({
templateUrl: 'employee.admin.component.html',
styleUrls: ['employee.admin.component.scss'],
providers: [AdminComponent]
})
export class EmployeeAdminComponent implements OnInit {
    employees: Employee[] = [];
    photo: any;
    number: number;
    id: string;
    depId: string;
    name: string;
    position: string;
    region: string;
    depIdPost: string;
    type: string;
    editId: string;
    editName: string;
    editPosition: string;
    editRegion: string;
    editDepId: string;
    editType: string;
    deleteId: string;
    photoId: string;
    postPhotoId: string;
    fileToUpload: File;
    deletePhotoId: string;
    postForm: FormGroup;
    modalMessage: string;
    modalTitle: string;
    modalColor: string;

    constructor(private repository: AdminComponent) {
        this.getEmployees(10);
    }

    ngOnInit() {
        $('#modal').on('hide.bs.modal', () => {
            this.photo = undefined;
          });
    }

    getEmployees(i: number) {
         this.repository.getEmployees().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Employee[]) => {
                this.employees = data;
                this.employees = this.employees.slice(0 , i);
            },
            error => console.log(error));
    }

    getEmployee(id: string) {
        this.modalTitle = 'Get Employee(id)';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите id сотрудника!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getEmployee(id).subscribe(
            (data: Employee) => {
                this.employees = [];
                this.employees.push(data);
                this.modalColor = '#2fc900';
                this.modalMessage = `Сотрудник ${id} выгружен в таблицу`;
            },
            error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Сотрудник ${id} не найден!`;
            });
        }
    }

    getbyDepId(depId: string) {
         this.modalTitle = 'Get Employee(by Department)';
         if (depId === undefined || depId === '') {
            this.modalMessage = 'Введите id отдела!';
            this.modalColor = '#f20800';
         } else {
         this.repository.getEmployeesbyDepartment(depId).subscribe(
            (data: Employee[]) => {
                this.employees = [];
                if (data && data.length !== 0) {
                this.employees = data;
                this.modalColor = '#2fc900';
                this.modalMessage = `Сотрудники отдела ${depId} выгружены в таблицу`;
                } else {
                    this.modalColor = '#f20800';
                    this.modalMessage = `Отдел  Id - ${depId} не найден или в нём отсутствуют сотрудники!`;
                }
            },
            error =>  console.log(error));
        }
    }

    addEmployee(name: string, position: string, region: string, depId: string, type: string ) {
        this.modalTitle = 'Add Employee';
        if (name === undefined || position === undefined || type === undefined || region === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addEmployee(name, position, region, depId, type).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Сотрудник добавлен.\n' + `Id - ${data.id}`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
            });
        }
    }

    updateEmployee(id: string, name: string, position: string, region: string, depId: string, type: string ) {
        this.modalTitle = 'Edit Employee';
        if (id === undefined || name === undefined || position === undefined || type === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        if (depId === undefined) {
            depId = '';
        }
        this.repository.updateEmployee(id, name, position, region, depId, type).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Данные по сотруднику  ${id} изменены`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
             });
        }
    }

    deleteEmployee(deleteId: string) {
        this.modalTitle = 'Delete Employee';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id сотрудника!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteEmployee(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Сотрудник ${deleteId} удалён`;
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Сотрудник ${deleteId} не найден!`;
               });
            }
     }

    getPhoto(id: string) {
        this.modalTitle = 'Get Photo';
        this.modalColor = '#2fc900';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getEmployeePhoto(id).subscribe(
            (data: Blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    this.photo = reader.result;
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Фото ${id}`;
                };
            },
            error => {
                console.log(error);
                this.modalMessage = `Фото  ${id} отсутствует`;
                this.modalColor = '#f20800';
            });
        }
        this.photo = undefined;
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    addPhoto(postPhotoId: string) {
        this.modalTitle = 'Add Photo';
        if (postPhotoId === undefined || postPhotoId === '' || this.fileToUpload === undefined ) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addEmployeePhoto(postPhotoId, this.fileToUpload).subscribe(
            (response: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено\n' + `Id фото - ${response.id}`;
            },
            (err) => {
                console.log(err);
                this.modalMessage = `Введите верные данные`;
                this.modalColor = '#f20800';
            }
          );
        }
    }

    deletePhoto(deleteId: string) {
        this.modalTitle = 'Delete Photo';
        if (deleteId === undefined || deleteId === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteEmployeePhoto(deleteId).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Фото  ${deleteId} удалено`;
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото  ${deleteId} отсутствует`;
                this.modalColor = '#f20800';
               });
            }
     }

}
