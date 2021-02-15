import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';
import { ServiceCategory } from 'src/app/models/servicecategory';
import { Service } from 'src/app/service/service/service.service';

declare var $: any;

@Component({
templateUrl: 'service.admin.component.html',
styleUrls: ['service.admin.component.scss'],
providers: [AdminComponent]
})
export class ServiceAdminComponent implements OnInit {
    categories: ServiceCategory[] = [];
    services: Service[] = [];
    number: number;
    serviceId: string;
    categoryId: string;
    serviceName: string;
    postCategoryId: string;
    editServiceId: string;
    editServiceName: string;
    editCategoryId: string;
    deleteServiceId: string;
    postForm: FormGroup;
    modalMessage: string;
    modalTitle: string;
    modalColor: string;

    constructor(private repository: AdminComponent) {
        this.getCategories();
    }

    ngOnInit() {
        }

    fetchServices(services: Service[]) {
        this.services = services;
    }

    getCategories() {
         this.categories = [];
         this.repository.getServiceCategories().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: ServiceCategory[]) => {
                // tslint:disable: prefer-for-of
               this.categories = data;
            },
            error => console.log(error));
    }

    getCategory(catId: string) {
        this.modalTitle = 'Get Category(id)';
        if (catId === undefined || catId === '') {
            this.modalMessage = 'Введите id категории!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getServiceCategory(catId).subscribe(
           // tslint:disable: no-shadowed-variable
           (data: ServiceCategory) => {
              this.categories = [];
              this.categories.push(data);
              this.modalColor = '#2fc900';
              this.modalMessage = `Категория ${catId} выгружена в таблицу`;
           },
           error => {
            console.log(error);
            this.modalColor = '#f20800';
            this.modalMessage = `Категория ${catId} не найдена!`;
           });
        }
    }

    addService(name: string, categoryId: string) {
        this.modalTitle = 'Add Service';
        if (name === undefined || categoryId === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addService(name, categoryId).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Услуга добавлена.\n' + `Id - ${data.id}`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
            });
         }
       }

    updateService(id: string, name: string, categoryId: string) {
        this.modalTitle = 'Edit Gallery';
        if (id === undefined || name === undefined || categoryId === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.updateService(id, name, categoryId).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Данные по услуге  ${id} изменены`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
             });
          }
        }

    deleteService(deleteId: string) {
            this.modalTitle = 'Delete Service';
            if (deleteId === undefined || deleteId === '' ) {
                this.modalMessage = 'Введите id услуги!';
                this.modalColor = '#f20800';
            } else {
            this.repository.deleteService(deleteId).subscribe(
                () => {
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Услуга ${deleteId} удалена`;
                 },
                 error => {
                    console.log(error);
                    this.modalColor = '#f20800';
                    this.modalMessage = `Услуга ${deleteId} не найдена!`;
                   });
                }
         }


}
