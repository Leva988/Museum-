import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';
import { Veteran } from 'src/app/models/veteran';

declare var $: any;

@Component({
templateUrl: 'veteran.admin.component.html',
styleUrls: ['veteran.admin.component.scss'],
providers: [AdminComponent]
})
export class VeteranAdminComponent implements OnInit {
    veterans: Veteran[] = [];
    photo: any;
    number: number;
    id: string;
    depId: string;
    name: string;
    position: string;
    birthDate: string;
    recruitDate: string;
    fireDate: string;
    editId: string;
    editName: string;
    editPosition: string;
    editRecruitDate: string;
    editFireDate: string;
    editBirthDate: string;
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
        this.getVeterans(10);
    }

    ngOnInit() {
        $('#modal').on('hide.bs.modal', () => {
            this.photo = undefined;
          });
    }

    getVeterans(i: number) {
         this.veterans = [];
         this.repository.getVeterans().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: Veteran[]) => {
                // tslint:disable: prefer-for-of
                for (let j = 0; j < data.length; j++) {
                    const d = data[j];
                    const birthDate = new Date(Date.parse(d.birthDay));
                    const recruitDate = new Date(Date.parse(d.recruitDate));
                    const fireDate = new Date(Date.parse(d.fireDate));
                    const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
                    const localbirthtdate = birthDate.toLocaleDateString(undefined, options);
                    const localrecruitdate = recruitDate.toLocaleDateString(undefined, options);
                    const localfiredate = fireDate.toLocaleDateString(undefined, options);
                    d.birthDay = localbirthtdate;
                    d.recruitDate = localrecruitdate;
                    d.fireDate = localfiredate;
                    this.veterans.push(d);
                    }
                this.veterans = this.veterans.slice(0 , i);
            },
            error => console.log(error));
    }

    getVeteran(id: string) {
        this.modalTitle = 'Get Veteran(id)';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите id сотрудника!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getVeteran(id).subscribe(
            (data: Veteran) => {
                this.veterans = [];
                const d = data;
                const birthDate = new Date(Date.parse(d.birthDay));
                const recruitDate = new Date(Date.parse(d.recruitDate));
                const fireDate = new Date(Date.parse(d.fireDate));
                const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
                const localbirthtdate = birthDate.toLocaleDateString(undefined, options);
                const localrecruitdate = recruitDate.toLocaleDateString(undefined, options);
                const localfiredate = fireDate.toLocaleDateString(undefined, options);
                d.birthDay = localbirthtdate;
                d.recruitDate = localrecruitdate;
                d.fireDate = localfiredate;
                this.veterans.push(d);
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

    addVeteran(name: string, position: string, birthDate: string, recruitDate: string, fireDate: string ) {
        this.modalTitle = 'Add Veteran';
        if (name === undefined || position === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addVeteran(name, position, birthDate, recruitDate, fireDate).subscribe(
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

    updateVeteran(id: string, name: string, position: string, birthDate: string, recruitDate: string, fireDate: string ) {
        this.modalTitle = 'Edit Veteran';
        if (id === undefined || name === undefined || position === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.updateVeteran(id, name, position, birthDate, recruitDate, fireDate).subscribe(
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

    deleteVeteran(deleteId: string) {
        this.modalTitle = 'Delete Veteran';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id сотрудника!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteVeteran(deleteId).subscribe(
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
        this.repository.getVeteranPhoto(id).subscribe(
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
        this.repository.addVeteranPhoto(postPhotoId, this.fileToUpload).subscribe(
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
        this.repository.deleteVeteranPhoto(deleteId).subscribe(
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
