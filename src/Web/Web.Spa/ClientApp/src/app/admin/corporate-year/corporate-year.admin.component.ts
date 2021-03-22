import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { NgForm } from '@angular/forms';
import { CorporateYear } from 'src/app/models/corporateyear';

declare var $: any;

@Component({
templateUrl: 'corporate-year.admin.component.html',
styleUrls: ['corporate-year.admin.component.scss'],
providers: [AdminComponent]
})
export class CorporateYearAdminComponent implements OnInit {
    years: CorporateYear[] = [];
    editYear: CorporateYear = new CorporateYear();
    editID: string;
    isNewRecord: boolean;
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
        $('#addModal').on('hidden.bs.modal', () => {
            this.modalMessage = this.modalColor = this.modalTitle = null;
            $('#modalMessage').hide();
        });
        this.getYears();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'year', headerName: 'Год', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateYear.bind(this),
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
                onClick: this.deleteYear.bind(this),
                    label: 'Удалить',
                    class: 'btn btn-danger',
                    modal: '',
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

    addYear() {
        this.editYear = new CorporateYear();
        this.modalTitle = 'Добавить год';
        this.isNewRecord = true;
    }

    updateYear(e) {
        this.editID = e.rowData.id;
        this.editYear = e.rowData;
        this.modalTitle = 'Изменить год';
        this.isNewRecord = false;
    }

    getYears() {
         this.repository.getCorporateYears().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: CorporateYear[]) => {
                this.years = data;
                this.rowData = this.years;
              },
            error => console.log(error));
    }

    saveYear(form: NgForm) {
        if (form.valid) {
            if (this.isNewRecord) {
                this.repository.addCorporateYear(this.editYear).subscribe(
                    () => {
                        this.modalMessage = `Год добавлен`;
                        this.modalColor = '#2fc900';
                        this.getYears();
                        $('#modalMessage').show();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateCorporateYear(this.editID, this.editYear).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по категории обновлены`;
                            $('#modalMessage').show();
                            this.getYears();
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
        this.editYear = new CorporateYear();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteYear(e) {
        if (confirm('Удалить данный год?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteCorporateYear(deleteId).subscribe(
                () => {
                    this.getYears();
                 },
                 error => {
                    console.log(error);
                   });
        }
     }

}
