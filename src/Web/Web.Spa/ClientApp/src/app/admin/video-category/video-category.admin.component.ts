import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ButtonRendererComponent } from '../button-renderer.component';
import {  GridOptions, GridReadyEvent } from 'ag-grid-community';
import { NgForm } from '@angular/forms';
import { VideoCategory } from 'src/app/models/videocategory';

declare var $: any;

@Component({
templateUrl: 'video-category.admin.component.html',
styleUrls: ['video-category.admin.component.scss'],
providers: [AdminComponent]
})
export class VideoCategoryAdminComponent implements OnInit {
    categories: VideoCategory[] = [];
    editCategory: VideoCategory = new VideoCategory();
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
        this.getCategories();
        // tslint:disable: deprecation
        this.columnDefs = [
            { field: 'name', headerName: 'Название категории', sortable: true, filter: true, resizable: true },
            {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.updateCategory.bind(this),
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
                onClick: this.deleteAllVideos.bind(this),
                    label: 'Удалить все видео',
                    class: 'btn btn-danger',
                    modal: ''
                   },
                resizable: true
               },
              {
                headerName: '',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                onClick: this.deleteCategory.bind(this),
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

    addCategory() {
        this.editCategory = new VideoCategory();
        this.modalTitle = 'Добавить категорию';
        this.isNewRecord = true;
    }

    updateCategory(e) {
        this.editID = e.rowData.id;
        this.editCategory = e.rowData;
        this.modalTitle = 'Изменить категорию';
        this.isNewRecord = false;
    }

    getCategories() {
         this.repository.getVideoCategories().subscribe(
            // tslint:disable: no-shadowed-variable
            (data: VideoCategory[]) => {
                this.categories = data;
                this.rowData = this.categories;
              },
            error => console.log(error));
    }

    saveCategory(form: NgForm) {
        if (form.valid) {
            if (this.isNewRecord) {
                this.repository.addVideoCategory(this.editCategory).subscribe(
                    () => {
                        this.modalMessage = `Категория добавлена`;
                        this.modalColor = '#2fc900';
                        this.getCategories();
                        $('#modalMessage').show();
                    },
                    error => {
                        this.modalMessage = 'Введите верные данные!';
                        this.modalColor = '#f20800';
                        $('#modalMessage').show();
                        console.log(error);
                     });
                } else {
                    this.repository.updateVideoCategory(this.editID, this.editCategory).subscribe(
                        () => {
                            this.modalColor = '#2fc900';
                            this.modalMessage = `Данные по категории обновлены`;
                            $('#modalMessage').show();
                            this.getCategories();
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
        this.editCategory = new VideoCategory();
        if (this.isNewRecord) {
            this.isNewRecord = false;
        }
    }

    deleteCategory(e) {
        if (confirm('Удалить данную категорию?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteVideoCategory(deleteId).subscribe(
                () => {
                    this.getCategories();
                 },
                 error => {
                    console.log(error);
                   });
        }
    }

    deleteAllVideos(e) {
        if (confirm('Удалить информацию о всех видео этой категории?')) {
            const deleteId = e.rowData.id;
            this.repository.deleteGalleryVideosByCategory(deleteId).subscribe(
                () => {
                    this.getCategories();
                 },
                 error => {
                    console.log(error);
                   });
        }
    }

}
