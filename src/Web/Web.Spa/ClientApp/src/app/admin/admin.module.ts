import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthToken } from './auth/auth.token';
import { EmployeeAdminComponent } from './employee/employee.admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExitGuard } from './auth/exit.admin.guard';
import { ButtonRendererComponent } from './button-renderer.component';
const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, // canActivate: [AuthGuard], canDeactivate: [ExitGuard],
    children: [
      { path: 'employees', component: EmployeeAdminComponent}, ]},
  { path: '**', redirectTo: 'auth' }
]);
@NgModule({
  imports: [CommonModule, FormsModule, routing, ReactiveFormsModule, AgGridModule.withComponents([ButtonRendererComponent])],
  declarations: [AuthComponent, AdminComponent, EmployeeAdminComponent, ButtonRendererComponent],
  providers: [AuthGuard, AuthToken, ExitGuard]
})
export class AdminModule {

    constructor(private router: Router) { }

 }
