import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';
import { SocialCategory } from 'src/app/models/socialcategory';

declare var $: any;

@Component({
templateUrl: 'social.category.admin.component.html',
styleUrls: ['social.category.admin.component.scss'],
providers: [AdminComponent]
})
export class SocialCategoryAdminComponent implements OnInit {
    categories: SocialCategory[] = [];
    image: any;
    number: number;
    id: string;
    name: string;
    description: string;
    editId: string;
    editName: string;
    editDescription: string;
    deleteId: string;
    imageId: string;
    postImageId: string;
    fileToUpload: File;
    deleteImageId: string;
    postForm: FormGroup;
    modalMessage: string;
    modalTitle: string;
    modalColor: string;

    constructor(private repository: AdminComponent) {
        this.getCategories(2);
    }

    ngOnInit() {
        $('#modal').on('hide.bs.modal', () => {
            this.image = undefined;
          });
    }

    getCategories(i: number) {
        this.repository.getSocialCategories().subscribe(
           // tslint:disable: no-shadowed-variable
           (data: SocialCategory[]) => {
               this.categories = data;
               this.categories = this.categories.slice(0 , i);
           },
           error => console.log(error));
   }

   getCategory(id: string) {
    this.modalTitle = 'Get Category(id)';
    if (id === undefined || id === '') {
        this.modalMessage = 'Введите id категории!';
        this.modalColor = '#f20800';
      } else {
    this.repository.getSocialCategory(id).subscribe(
        (data: SocialCategory) => {
            this.categories = [];
            this.categories.push(data);
            this.modalColor = '#2fc900';
            this.modalMessage = `Категория ${id} выгружена в таблицу`;
        },
        error => {
            console.log(error);
            this.modalColor = '#f20800';
            this.modalMessage = `Категория ${id} не найдена!`;
        });
    }
  }

  addCategory(name: string, description: string) {
    this.modalTitle = 'Add Category';
    if (name === undefined || description === undefined) {
        this.modalMessage = 'Введите данные!';
        this.modalColor = '#f20800';
    } else {
    this.repository.addSocialCategory(name, description).subscribe(
        (data: any) => {
            this.modalColor = '#2fc900';
            this.modalMessage = 'Категория добавлена.\n' + `Id - ${data.id}`;
        },
        error => {
            this.modalMessage = 'Введите верные данные!';
            this.modalColor = '#f20800';
            console.log(error);
        });
     }
   }

   updateCategory(id: string, name: string, description: string) {
    this.modalTitle = 'Edit Category';
    if (id === undefined || name === undefined) {
        this.modalMessage = 'Введите данные!';
        this.modalColor = '#f20800';
    } else {
    this.repository.updateSocialCategory(id, name, description).subscribe(
        (data: any) => {
            this.modalColor = '#2fc900';
            this.modalMessage = `Данные по категории  ${id} изменены`;
        },
        error => {
            this.modalMessage = 'Введите верные данные!';
            this.modalColor = '#f20800';
            console.log(error);
         });
      }
    }

    deleteCategory(deleteId: string) {
        this.modalTitle = 'Delete Category';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id категории!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteSocialCategory(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Категория ${deleteId} удалена`;
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Категория ${deleteId} не найдена!`;
               });
            }
     }

    getImage(id: string) {
        this.modalTitle = 'Get Image';
        this.modalColor = '#2fc900';
        if (id === undefined || id === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getSocialImage(id).subscribe(
            (data: Blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    this.image = reader.result;
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Фоновая картинка ${id}`;
                };
            },
            error => {
                console.log(error);
                this.modalMessage = `Картинка ${id} отсутствует`;
                this.modalColor = '#f20800';
            });
        }
        this.image = undefined;
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    addImage(postPhotoId: string) {
        this.modalTitle = 'Add Image';
        if (this.postImageId === undefined || this.postImageId === '' || this.fileToUpload === undefined ) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addSocialtImage(postPhotoId, this.fileToUpload).subscribe(
            (response: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Картинка добавлена\n' + `Id  - ${response.id}`;
            },
            (err) => {
                console.log(err);
                this.modalMessage = `Введите верные данные`;
                this.modalColor = '#f20800';
            }
          );
        }
    }

    deleteImage(deleteId: string) {
        this.modalTitle = 'Delete Image';
        if (deleteId === undefined || deleteId === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteSocialImage(deleteId).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Картинка  ${deleteId} удалена`;
             },
             error => {
                console.log(error);
                this.modalMessage = `Картинка  ${deleteId} отсутствует`;
                this.modalColor = '#f20800';
               });
            }
     }

}
