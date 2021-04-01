import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthToken } from './auth.token';

@Component({
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  public name: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router, private auth: AuthToken) {
  }
  authenticate(form: NgForm) {
    if (form.valid) {
    this.auth.authenticate(this.name, this.password).subscribe(
      data =>  {
        this.router.navigateByUrl('/admin/main');
      }, error => {
        alert('Пользователь не найден');
        console.log(error);
      });
    } else {
      this.errorMessage = 'Введите верные данные';
      }
    }
}
