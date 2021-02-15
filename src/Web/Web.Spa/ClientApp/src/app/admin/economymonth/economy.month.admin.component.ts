import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';
import { EconomyMonth } from 'src/app/models/economymonth';

declare var $: any;

@Component({
templateUrl: 'economy.month.admin.component.html',
styleUrls: ['economy.month.admin.component.scss'],
providers: [AdminComponent]
})
export class EconomyMonthAdminComponent implements OnInit {
    economyMonths: EconomyMonth[] = [];
    number: number;
    id: string;
    depId: string;
    month: string;
    departmentId: string;
    innerVolume: number;   outerVolume: number;
    servicePrice: number;
    laborCosts: number; amortization: number; mainAmortization: number; otherServices: number;
    result: number; rentability: number;
    salary: number; salaryDollar: number;
    work: number; workDollar: number;
    editId: string;
    editMonth: string;
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
        this.getMonths(5);
    }

    ngOnInit() {
    }

    getMonths(i: number) {
         this.repository.getEconomyMonths().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: EconomyMonth[]) => {
                this.economyMonths = data;
                this.economyMonths = this.economyMonths.slice(0 , i);
            },
            error => console.log(error));
    }

    getMonth(id: string) {
        this.modalTitle = 'Get EconomyMonth(id)';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите id месяца!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getEconomyMonth(id).subscribe(
            (data: EconomyMonth) => {
                console.log(data);
                this.economyMonths = [];
                this.economyMonths.push(data);
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели ${data.month} месяца отдела ${data.departmentId} выгружены в таблицу`;
            },
            error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Показатели месяца ${id} не найдены!`;
            });
        }
    }

    getbyDepId(depId: string) {
         this.modalTitle = 'Get EconomyMonth(by Department)';
         if (depId === undefined || depId === '') {
            this.modalMessage = 'Введите id отдела!';
            this.modalColor = '#f20800';
         } else {
         this.repository.getEconomyMonthsbyDepartment(depId).subscribe(
            (data: EconomyMonth[]) => {
                this.economyMonths = [];
                if (data && data.length !== 0) {
                this.economyMonths = data;
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

    addEconomyMonth(month: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                    laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                    result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number ) {
        this.modalTitle = 'Add EconomyMonth';
        if (month === undefined || departmentId === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addEconomyMonth(month, departmentId, innerVolume, outerVolume, serviceprice,
            laborCosts, amortization, mainAmortization, otherServices, result, rentability,
            salary, salaryDollar, work, workDollar).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели ${month} месяца, отдела ${departmentId} добавлены.\n` + `Id - ${data.id}`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
            });
        }
    }

    updateEconomyMonth(id: string, month: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                       laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                       result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number) {
        this.modalTitle = 'Edit EconomyMonth';
        if (id === undefined || month === undefined || departmentId === undefined) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        if (departmentId === undefined) {
            departmentId = '';
        }
        this.repository.updateEconomyMonth(id, month, departmentId, innerVolume, outerVolume, serviceprice,
            laborCosts, amortization, mainAmortization, otherServices, result, rentability,
            salary, salaryDollar, work, workDollar).subscribe(
            (data: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели  ${month} месяца, отдела ${departmentId} изменены`;
            },
            error => {
                this.modalMessage = 'Введите верные данные!';
                this.modalColor = '#f20800';
                console.log(error);
             });
        }
    }

    deleteEconomyMonth(deleteId: string) {
        this.modalTitle = 'Delete EconomyMonth';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id месяца!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteEconomyMonth(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Показатели ${deleteId} месяца удалены`;
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Показатели месяца ${deleteId} не найдены!`;
               });
            }
     }

}
