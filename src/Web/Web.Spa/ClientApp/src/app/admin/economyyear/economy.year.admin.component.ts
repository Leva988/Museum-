import { Component, OnInit } from '@angular/core';
import { EconomyYear } from 'src/app/models/economyyear';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';

declare var $: any;

@Component({
templateUrl: 'economy.year.admin.component.html',
styleUrls: ['economy.year.admin.component.scss'],
providers: [AdminComponent]
})
export class EconomyYearAdminComponent implements OnInit {
    economyYears: EconomyYear[] = [];
    number: number;
    id: string;
    depId: string;
    year: string;
    departmentId: string;
    innerVolume: number;   outerVolume: number;
    servicePrice: number;
    laborCosts: number; amortization: number; mainAmortization: number; otherServices: number;
    result: number; rentability: number;
    salary: number; salaryDollar: number;
    work: number; workDollar: number;
    editId: string;
    editYear: string;
    editDepartmentId: string;
    editInnerVolume: number;   editOuterVolume: number;
    editServiceprice: number;
    editLaborCosts: number; editAmortization: number; editMainAmortization: number; editOtherServices: number;
    editResult: number; editRentability: number;
    editSalary: number; editSalaryDollar: number;
    editWork: number; editWorkDollar: number;
    deleteId: string;
    postForm: FormGroup;
    modalMessage: string;
    modalTitle: string;
    modalColor: string;

    constructor(private repository: AdminComponent) {
        this.getYears(5);
    }

    ngOnInit() {
    }

    getYears(i: number) {
         this.repository.getEconomyYears().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: EconomyYear[]) => {
                this.economyYears = data;
                this.economyYears = this.economyYears.slice(0 , i);
            },
            error => console.log(error));
    }

    getYear(id: string) {
        this.modalTitle = 'Get EconomyYear(id)';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите id года!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getEconomyYear(id).subscribe(
            (data: EconomyYear) => {
                console.log(data);
                this.economyYears = [];
                this.economyYears.push(data);
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели ${data.year} года отдела ${data.departmentId} выгружены в таблицу`;
            },
            error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Показатели года ${id} не найдены!`;
            });
        }
    }

    getbyDepId(depId: string) {
         this.modalTitle = 'Get EconomyYear(by Department)';
         if (depId === undefined || depId === '') {
            this.modalMessage = 'Введите id отдела!';
            this.modalColor = '#f20800';
         } else {
         this.repository.getEconomyYearsbyDepartment(depId).subscribe(
            (data: EconomyYear[]) => {
                this.economyYears = [];
                if (data && data.length !== 0) {
                this.economyYears = data;
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели отдела ${depId} выгружены в таблицу`;
                } else {
                   this.modalColor = '#f20800';
                   this.modalMessage = `Отдел  Id - ${depId} не найден или отсутствуют показатели!`;
                }
            },
            error => console.log(error));
        }
    }

    addEconomyYear(year: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                   laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                   result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number ) {
        this.modalTitle = 'Add EconomyYear';
        if (year === undefined || departmentId === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addEconomyYear(year, departmentId, innerVolume, outerVolume, serviceprice,
            laborCosts, amortization, mainAmortization, otherServices, result, rentability,
            salary, salaryDollar, work, workDollar).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели ${year} года, отдела ${departmentId} добавлены.\n` + `Id - ${data.id}`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
            });
        }
    }

    updateEconomyYear(id: string, year: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                      laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                      result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number) {
        this.modalTitle = 'Edit EconomyYear';
        if (id === undefined || year === undefined || departmentId === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        if (departmentId === undefined) {
            departmentId = '';
        }
        this.repository.updateEconomyYear(id, year, departmentId, innerVolume, outerVolume, serviceprice,
            laborCosts, amortization, mainAmortization, otherServices, result, rentability,
            salary, salaryDollar, work, workDollar).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели  ${year} года, отдела ${departmentId} изменены`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
             });
        }
    }

    deleteEconomyYear(deleteId: string) {
        this.modalTitle = 'Delete EconomyYear';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id года!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteEconomyYear(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели ${deleteId} года удалены`;
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Показатели года ${deleteId} не найдены!`;
               });
            }
     }

}
