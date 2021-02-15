import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminComponent } from '../admin.component';
import { Gallery } from 'src/app/models/gallery';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
templateUrl: 'gallery.admin.component.html',
styleUrls: ['gallery.admin.component.scss'],
providers: [AdminComponent]
})
export class GalleryAdminComponent implements OnInit {
    galleries: Gallery[] = [];
    image: any;
    number: number;
    id: string;
    name: string;
    date: string;
    categoryId: string;
    editName: string;
    editId: string;
    editDate: string;
    editCategoryId: string;
    deleteId: string;
    galleryId: string;
    postImageId: string;
    fileToUpload: File;
    deleteGalleryId: string;
    deleteImageId: string;
    postForm: FormGroup;
    photoId: string;
    modalMessage: string;
    modalTitle: string;
    modalColor: string;
    backendUrl: string = environment.backendUrl + '/Gallery';
    photos: string[] = [];
    galleryIdModal: string;

    constructor(private repository: AdminComponent) {
        this.getGalleries(3);
    }

    ngOnInit() {
        $('#modal').on('hide.bs.modal', () => {
            this.image = undefined;
          });
        $('#modalPhoto').on('hide.bs.modal', () => {
            this.photos = [];
            this.galleryIdModal = '';
          });
    }

    allPhotoView(galleryId: string, photos: string[]) {
       this.photos = photos;
       this.galleryIdModal = galleryId;
    }

    getGalleries(i: number) {
        this.galleries = [];
        this.repository.getGallleries().subscribe(
           // tslint:disable: no-shadowed-variable
           (data: Gallery[]) => {
               // tslint:disable: prefer-for-of
               for ( let j = 0; j < data.length ; j++) {
                  const d = data[j];
                  const date = new Date(Date.parse(d.date));
                  const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
                  const local = date.toLocaleDateString(undefined, options);
                  d.date = local;
                  this.galleries.push(d);
               }
               this.galleries = this.galleries.slice(0 , i);
           },
           error => console.log(error));
   }

   getGallery(id: string) {
    this.modalTitle = 'Get Gallery(id)';
    if (id === undefined || id === '') {
        this.modalMessage = 'Введите id галереи!';
        this.modalColor = '#f20800';
      } else {
    this.repository.getGallery(id).subscribe(
        (data: Gallery) => {
            this.galleries = [];
            const d = data;
            const date = new Date(Date.parse(d.date));
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            const local = date.toLocaleDateString(undefined, options);
            d.date = local;
            this.galleries.push(d);
            this.modalColor = '#2fc900';
            this.modalMessage = `Галерея ${id} выгружена в таблицу`;
        },
        error => {
            console.log(error);
            this.modalColor = '#f20800';
            this.modalMessage = `Галерея ${id} не найдена!`;
        });
    }
   }

   getGallerybyCategory(catId: string) {
    this.galleries = [];
    this.modalTitle = 'Get Gallery(by Categoryid)';
    if (catId === undefined || catId === '') {
        this.modalMessage = 'Введите id категории!';
        this.modalColor = '#f20800';
      } else {
    this.repository.getGallerybyCategory(catId).subscribe(
        (data: Gallery[]) => {
            for ( let i = 0; i < data.length; i++) {
               const d = data[i];
               const date = new Date(Date.parse(d.date));
               const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
               const local = date.toLocaleDateString(undefined, options);
               d.date = local;
               this.galleries.push(d);
            }
            this.modalColor = '#2fc900';
            this.modalMessage = `Галереи категории ${catId} выгружена в таблицу`;
        },
        error => {
            console.log(error);
            this.modalColor = '#f20800';
            this.modalMessage = `Галереи категории ${catId} не найдена!`;
        });
    }
   }

  addGallery(name: string, date: string, categoryId: string) {
    this.modalTitle = 'Add Gallery';
    if (name === undefined || categoryId === undefined) {
        this.modalMessage = 'Введите данные!';
        this.modalColor = '#f20800';
    } else {
    this.repository.addGallery(name, date, categoryId).subscribe(
        (data: any) => {
            this.modalColor = '#2fc900';
            this.modalMessage = 'Галерея добавлена.\n' + `Id - ${data.id}`;
        },
        error => {
            this.modalMessage = 'Введите верные данные!';
            this.modalColor = '#f20800';
            console.log(error);
        });
     }
   }

   updateGallery(id: string, name: string, date: string, categoryId: string) {
    this.modalTitle = 'Edit Gallery';
    if (id === undefined || name === undefined) {
        this.modalMessage = 'Введите данные!';
        this.modalColor = '#f20800';
    } else {
    this.repository.updateGallery(id, name, date, categoryId).subscribe(
        (data: any) => {
            this.modalColor = '#2fc900';
            this.modalMessage = `Данные по галерее  ${id} изменены`;
        },
        error => {
            this.modalMessage = 'Введите верные данные!';
            this.modalColor = '#f20800';
            console.log(error);
         });
      }
    }

    deleteGallery(deleteId: string) {
        this.modalTitle = 'Delete Gallery';
        if (deleteId === undefined || deleteId === '' ) {
            this.modalMessage = 'Введите id галереи!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteGallery(deleteId).subscribe(
            () => {
                this.modalColor = '#2fc900';
                this.modalMessage = `Галерея ${deleteId} удалена`;
             },
             error => {
                console.log(error);
                this.modalColor = '#f20800';
                this.modalMessage = `Галерея ${deleteId} не найдена!`;
               });
            }
     }

    getPhoto(id: string, photoId: string) {
        this.modalTitle = 'Get Photo';
        this.modalColor = '#2fc900';
        if (id === undefined || id === '' || photoId === undefined || id === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
          } else {
        this.repository.getGalleryPhoto(id, photoId).subscribe(
            (data: Blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    this.image = reader.result;
                    this.modalColor = '#2fc900';
                    this.modalMessage = `Фото ${photoId} галереи ${id}`;
                };
            },
            error => {
                console.log(error);
                this.modalMessage = `Фото ${photoId} или галерея ${id} отсутствует`;
                this.modalColor = '#f20800';
            });
        }
        this.image = undefined;
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    addPhoto(postPhotoId: string) {
        this.modalTitle = 'Add Photo';
        if (this.postImageId === undefined || this.postImageId === '' || this.fileToUpload === undefined ) {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.addGalleryPhoto(postPhotoId, this.fileToUpload).subscribe(
            (response: any) => {
                this.modalColor = '#2fc900';
                this.modalMessage = 'Фото добавлено\n' + `Id  - ${response.id}`;
                this.getGalleries(3);
            },
            (err) => {
                console.log(err);
                this.modalMessage = `Введите верные данные`;
                this.modalColor = '#f20800';
            }
          );
        }
    }

    deletePhoto(deleteId: string, deletePhotoID: string) {
        this.modalTitle = 'Delete Photo';
        if (deleteId === undefined || deleteId === '' || deletePhotoID === undefined || deletePhotoID === '') {
            this.modalMessage = 'Введите данные!';
            this.modalColor = '#f20800';
        } else {
        this.repository.deleteGalleryPhoto(deleteId, deletePhotoID).subscribe(
            () => {
                 this.modalColor = '#2fc900';
                 this.modalMessage = `Фото  ${deletePhotoID} галереи ${deleteId} удалено`;
                 this.getGalleries(3);
             },
             error => {
                console.log(error);
                this.modalMessage = `Фото ${deletePhotoID} или галерея ${deleteId} отсутствует `;
                this.modalColor = '#f20800';
               });
            }
     }

}
