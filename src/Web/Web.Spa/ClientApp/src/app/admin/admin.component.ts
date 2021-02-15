import { Component, Version } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ComponentCanDeactivate } from './auth/exit.admin.guard';
import { AuthToken } from './auth/auth.token';
import { HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Project } from '../models/project';
import { EconomyYear } from '../models/economyyear';
import { Expenses } from '../models/expenses';
import { FinancialResults } from '../models/finresults';
import { EconomyMonth } from '../models/economymonth';
import { SocialCategory } from '../models/socialcategory';
import { Gallery } from '../models/gallery';
import { Veteran } from '../models/veteran';
import { Service } from '../models/service';
@Component({
templateUrl: 'admin.component.html',
styleUrls: ['admin.component.scss'],
providers: [AuthComponent]
})

export class AdminComponent implements ComponentCanDeactivate  {
   baseUrl: string;
   authHeaders: HttpHeaders;
   constructor(private router: Router, private token: AuthToken, private http: HttpClient) {
      this.baseUrl = environment.backendUrl;
      this.authHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token.auth_token}`);
    }

   logout() {
     this.token.authentificated = false;
     this.router.navigateByUrl('/');
    }

  canDeactivate(): boolean | Observable<boolean> {
     return confirm('Вы хотите покинуть страницу? Данные авторизации будут утеряны!');
  }

  // Employee Panel
  getEmployees() {
    return this.http.get(this.baseUrl + '/employees');
  }

  getEmployee(id: string) {
      return  this.http.get(this.baseUrl + '/Employees' + '/' + id, {responseType: 'json'});
  }

  getEmployeesbyDepartment(depId: string) {
      return  this.http.get(this.baseUrl + '/Employees/Department' + '/' + depId);
  }

  addEmployee(name: string, position: string,  region: string, depId: string, type: string) {
      const emp = new Employee();
      emp.name = name;
      emp.position = position;
      emp.departmentId = depId;
      if (type === 'Начальник отдела') {
          emp.type = 'boss';
      } else {
          emp.type = 'employee';
      }
      switch (region) {
          case 'Брест':
              region = 'Brest';
              break;
          case 'Витебск':
              region = 'Vitebsk';
              break;
          case 'Гомель':
              region = 'Gomel';
              break;
          case 'Гродно':
              region = 'Grodno';
              break;
          case 'Минск':
              region = 'Minsk';
              break;
          case 'Могилёв':
              region = 'Mogilev';
              break;
      }
      emp.region = region;
      const heads = new HttpHeaders();
      heads.set('Authorization', `Bearer ${this.token}`);
      return this.http.post(this.baseUrl + '/Employees/Employee', emp,
      {
        headers: this.authHeaders
      });
    }

  updateEmployee(id: string, name: string, position: string, region: string, depId: string, type: string) {
      const emp = new Employee();
      emp.name = name;
      emp.position = position;
      emp.departmentId = depId;
      emp.region = region;
      if (type === 'Начальник отдела') {
          emp.type = 'boss';
      } else {
          emp.type = 'employee';
      }
      switch (region) {
          case 'Брест':
              region = 'Brest';
              break;
          case 'Витебск':
              region = 'Vitebsk';
              break;
          case 'Гомель':
              region = 'Gomel';
              break;
          case 'Гродно':
              region = 'Grodno';
              break;
          case 'Минск':
              region = 'Minsk';
              break;
          case 'Могилёв':
              region = 'Mogilev';
              break;
      }
      emp.region = region;
      return this.http.put(this.baseUrl + '/Employees' + '/' + id, emp,
      {
        headers: this.authHeaders
      });
    }

  deleteEmployee(id: string) {
      return this.http.delete(this.baseUrl + '/Employees' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  getEmployeePhoto(id: string) {
      return  this.http.get(this.baseUrl + '/Employees' + '/' + id + '/Photo', {responseType: 'blob'});
  }

  addEmployeePhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Employees/' + id + '/Photo', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteEmployeePhoto(id: string) {
      return this.http.delete(this.baseUrl + '/Employees/' + id + '/Photo',
      {
        headers: this.authHeaders
      });
    }

   // Project Panel
  getProjects() {
      return this.http.get(this.baseUrl + '/Projects');
  }

  getProject(id: string) {
      return  this.http.get(this.baseUrl + '/Projects' + '/' + id, {responseType: 'json'});
  }

  getProjectsbyDepartment(depId: string) {
      return  this.http.get(this.baseUrl + '/Projects/Department' + '/' + depId);
  }

  addProject(name: string, description: string, color: string, depId: string, serviceId: string) {
      const proj = new Project();
      proj.name = name;
      proj.description = description;
      proj.color = color;
      proj.departmentId = depId;
      proj.serviceId = serviceId;
      return this.http.post(this.baseUrl + '/Projects', proj,
      {
        headers: this.authHeaders
      });
    }

  updateProject(id: string, name: string, description: string, color: string, depId: string, serviceId: string) {
      const proj = new Project();
      proj.name = name;
      proj.description = description;
      proj.color = color;
      proj.departmentId = depId;
      proj.serviceId = serviceId;
      return this.http.put(this.baseUrl + '/Projects' + '/' + id, proj,
      {
        headers: this.authHeaders
      });
    }

  deleteProject(id: string) {
      return this.http.delete(this.baseUrl + '/Projects' + '/' + id,
       {
        headers: this.authHeaders
       });
    }

  getProjectImage(id: string) {
      return  this.http.get(this.baseUrl + '/Projects' + '/' + id + '/Image', {responseType: 'blob'});
  }

  addProjectImage(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Projects/' + id + '/Image', formData,
      {
        headers: this.authHeaders
      });
    }

  deleteProjectImage(id: string) {
      return this.http.delete(this.baseUrl + '/Projects/' + id + '/Image',
      {
        headers: this.authHeaders
      });
    }

    // EconomyYears
   getEconomyYears() {
       return this.http.get(this.baseUrl + '/EconomyYears');
   }

   getEconomyYear(id: string) {
       return  this.http.get(this.baseUrl + '/EconomyYears' + '/' + id);
   }

   getEconomyYearsbyDepartment(depId: string) {
       return  this.http.get(this.baseUrl + '/EconomyYears/Department' + '/' + depId);
    }

   addEconomyYear(year: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                  laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                  result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number) {
       const exp = new Expenses();
       exp.amortization = amortization;
       exp.laborCosts = laborCosts;
       exp.mainAmortization = mainAmortization;
       exp.otherServices = otherServices;
       const res = new FinancialResults();
       res.result = result;
       res.rentability = rentability;
       const ecYear = new EconomyYear();
       ecYear.year = year;
       ecYear.departmentId = departmentId;
       ecYear.innerVolume = innerVolume;
       ecYear.outerVolume = outerVolume;
       ecYear.servicePrice = serviceprice;
       ecYear.expenses = exp;
       ecYear.financialResults = res;
       ecYear.salary = salary;
       ecYear.work = work;
       ecYear.salaryDollar = salaryDollar;
       ecYear.workDollar = workDollar;
       return this.http.post(this.baseUrl + '/EconomyYears', ecYear,
       {
         headers: this.authHeaders
       });
     }

   updateEconomyYear(id: string, year: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                     laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                     result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number) {
       const exp = new Expenses();
       exp.amortization = amortization;
       exp.laborCosts = laborCosts;
       exp.mainAmortization = mainAmortization;
       exp.otherServices = otherServices;
       const res = new FinancialResults();
       res.result = result;
       res.rentability = rentability;
       const ecYear = new EconomyYear();
       ecYear.year = year;
       ecYear.departmentId = departmentId;
       ecYear.innerVolume = innerVolume;
       ecYear.outerVolume = outerVolume;
       ecYear.servicePrice = serviceprice;
       ecYear.expenses = exp;
       ecYear.financialResults = res;
       ecYear.salary = salary;
       ecYear.salaryDollar = salaryDollar;
       ecYear.work = work;
       ecYear.workDollar = workDollar;
       return this.http.put(this.baseUrl + '/EconomyYears' + '/' + id, ecYear,
       {
         headers: this.authHeaders
       });
     }

   deleteEconomyYear(id: string) {
       return this.http.delete(this.baseUrl + '/EconomyYears' + '/' + id,
        {
         headers: this.authHeaders
        });
     }

    // EconomyMonth
    getEconomyMonths() {
      return this.http.get(this.baseUrl + '/EconomyMonths');
    }

    getEconomyMonth(id: string) {
      return  this.http.get(this.baseUrl + '/EconomyMonths' + '/' + id);
    }

    getEconomyMonthsbyDepartment(depId: string) {
      return  this.http.get(this.baseUrl + '/EconomyMonths/Department' + '/' + depId);
    }

    addEconomyMonth(month: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                    laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                    result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number) {
      const exp = new Expenses();
      exp.amortization = amortization;
      exp.laborCosts = laborCosts;
      exp.mainAmortization = mainAmortization;
      exp.otherServices = otherServices;
      const res = new FinancialResults();
      res.result = result;
      res.rentability = rentability;
      const ecMonth = new EconomyMonth();
      ecMonth.month = month;
      ecMonth.departmentId = departmentId;
      ecMonth.innerVolume = innerVolume;
      ecMonth.outerVolume = outerVolume;
      ecMonth.servicePrice = serviceprice;
      ecMonth.expenses = exp;
      ecMonth.financialResults = res;
      ecMonth.salary = salary;
      ecMonth.work = work;
      ecMonth.salaryDollar = salaryDollar;
      ecMonth.workDollar = workDollar;
      return this.http.post(this.baseUrl + '/EconomyMonths', ecMonth,
      {
        headers: this.authHeaders
      });
    }

    updateEconomyMonth(id: string, month: string, departmentId: string, innerVolume: number, outerVolume: number, serviceprice: number,
                       laborCosts: number, amortization: number, mainAmortization: number, otherServices: number,
                       result: number, rentability: number, salary: number, salaryDollar: number, work: number, workDollar: number) {
    const exp = new Expenses();
    exp.amortization = amortization;
    exp.laborCosts = laborCosts;
    exp.mainAmortization = mainAmortization;
    exp.otherServices = otherServices;
    const res = new FinancialResults();
    res.result = result;
    res.rentability = rentability;
    const ecMonth = new EconomyMonth();
    ecMonth.month = month;
    ecMonth.departmentId = departmentId;
    ecMonth.innerVolume = innerVolume;
    ecMonth.outerVolume = outerVolume;
    ecMonth.servicePrice = serviceprice;
    ecMonth.expenses = exp;
    ecMonth.financialResults = res;
    ecMonth.salary = salary;
    ecMonth.salaryDollar = salaryDollar;
    ecMonth.work = work;
    ecMonth.workDollar = workDollar;
    return this.http.put(this.baseUrl + '/EconomyMonths' + '/' + id, ecMonth,
    {
      headers: this.authHeaders
    });
  }

  deleteEconomyMonth(id: string) {
    return this.http.delete(this.baseUrl + '/EconomyMonths' + '/' + id,
     {
      headers: this.authHeaders
     });
  }

  // SocialCategory Panel
  getSocialCategories() {
    return this.http.get(this.baseUrl + '/SocialCategories');
  }

  getSocialCategory(id: string) {
    return  this.http.get(this.baseUrl + '/SocialCategories' + '/' + id, {responseType: 'json'});
  }

  addSocialCategory(name: string, description: string) {
    const proj = new SocialCategory();
    proj.name = name;
    proj.description = description;
    return this.http.post(this.baseUrl + '/SocialCategories', proj,
    {
      headers: this.authHeaders
    });
  }

  updateSocialCategory(id: string, name: string, description: string) {
    const proj = new SocialCategory();
    proj.name = name;
    proj.description = description;
    return this.http.put(this.baseUrl + '/SocialCategories' + '/' + id, proj,
    {
      headers: this.authHeaders
    });
  }

  deleteSocialCategory(id: string) {
    return this.http.delete(this.baseUrl + '/SocialCategories' + '/' + id,
     {
      headers: this.authHeaders
     });
  }

  getSocialImage(id: string) {
    return  this.http.get(this.baseUrl + '/SocialCategories' + '/' + id + '/Photo', {responseType: 'blob'});
  }

  addSocialtImage(id: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('avatar', file, file.name);
    return this.http.post(this.baseUrl + '/SocialCategories/' + id + '/Photo', formData,
    {
      headers: this.authHeaders
    });
  }

  deleteSocialImage(id: string) {
    return this.http.delete(this.baseUrl + '/SocialCategories/' + id + '/Photo',
    {
      headers: this.authHeaders
    });
  }

    // Gallery Panel
    getGallleries() {
      return this.http.get(this.baseUrl + '/Gallery');
    }

    getGallery(id: string) {
      return  this.http.get(this.baseUrl + '/Gallery' + '/' + id, {responseType: 'json'});
    }

    getGallerybyCategory(catID: string) {
      return  this.http.get(this.baseUrl + '/Gallery' + '/' + 'SocialCategory' + '/' + catID);
    }


    addGallery(name: string, date: string, categoryId: string) {
      const gallery = new Gallery();
      gallery.name = name;
      gallery.date = date;
      gallery.categoryId = categoryId;
      return this.http.post(this.baseUrl + '/Gallery', gallery,
      {
        headers: this.authHeaders
      });
    }

    updateGallery(id: string, name: string, date: string, categoryId: string) {
      const gallery = new Gallery();
      gallery.name = name;
      gallery.date = date;
      gallery.categoryId = categoryId;
      return this.http.put(this.baseUrl + '/Gallery' + '/' + id, gallery,
      {
        headers: this.authHeaders
      });
    }

    deleteGallery(id: string) {
      return this.http.delete(this.baseUrl + '/Gallery' + '/' + id,
       {
        headers: this.authHeaders
       });
    }

    getGalleryPhoto(id: string, photoId: string) {
      return  this.http.get(this.baseUrl + '/Gallery' + '/' + id + '/item' + '/' + photoId, {responseType: 'blob'});
    }

    addGalleryPhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Gallery/' + id + '/item', formData,
      {
        headers: this.authHeaders
      });
    }

    deleteGalleryPhoto(id: string, photoId: string) {
      return this.http.delete(this.baseUrl + '/Gallery/' + id + '/item' + '/' + photoId,
      {
        headers: this.authHeaders
      });
    }

    // Veteran
    getVeterans() {
      return this.http.get(this.baseUrl + '/Veterans');
    }

    getVeteran(id: string) {
        return  this.http.get(this.baseUrl + '/Veterans' + '/' + id, {responseType: 'json'});
    }

    addVeteran(name: string, position: string,  birthDay: string, recruitDate: string, fireDate: string) {
        const vet = new Veteran();
        vet.name = name;
        vet.position = position;
        vet.birthDay = birthDay;
        vet.recruitDate = recruitDate;
        vet.fireDate = fireDate;
        return this.http.post(this.baseUrl + '/Veterans/Veteran', vet,
        {
          headers: this.authHeaders
        });
      }

    updateVeteran(id: string, name: string, position: string,  birthDay: string, recruitDate: string, fireDate: string) {
        const vet = new Veteran();
        vet.name = name;
        vet.position = position;
        vet.birthDay = birthDay;
        vet.recruitDate = recruitDate;
        vet.fireDate = fireDate;
        return this.http.put(this.baseUrl + '/Veterans' + '/' + id, vet,
        {
          headers: this.authHeaders
        });
      }

    deleteVeteran(id: string) {
        return this.http.delete(this.baseUrl + '/Veterans' + '/' + id,
        {
          headers: this.authHeaders
        });
      }

    getVeteranPhoto(id: string) {
        return  this.http.get(this.baseUrl + '/Veterans' + '/' + id + '/Photo', {responseType: 'blob'});
    }

    addVeteranPhoto(id: string, file: File) {
        const formData: FormData = new FormData();
        formData.append('avatar', file, file.name);
        return this.http.post(this.baseUrl + '/Veterans/' + id + '/Photo', formData,
        {
          headers: this.authHeaders
        });
     }

    deleteVeteranPhoto(id: string) {
        return this.http.delete(this.baseUrl + '/Veterans/' + id + '/Photo',
        {
          headers: this.authHeaders
        });
      }

    // Services
    getServiceCategories() {
      return this.http.get(this.baseUrl + '/ServiceCategories');
    }

    getServiceCategory(catId: string) {
      return  this.http.get(this.baseUrl + '/ServiceCategories' + '/' + catId, {responseType: 'json'});
    }

    getService(id: string) {
      return  this.http.get(this.baseUrl + '/Services' + '/' + id, {responseType: 'json'});
    }

    addService(name: string, categoryId: string) {
      const service = new Service();
      service.name = name;
      service.categoryId = categoryId;
      return this.http.post(this.baseUrl + '/Services', service,
      {
        headers: this.authHeaders
      });
    }

   updateService(id: string, name: string, categoryId: string) {
      const service = new Service();
      service.name = name;
      service.categoryId = categoryId;
      return this.http.put(this.baseUrl + '/Services' + '/' + id, service,
      {
        headers: this.authHeaders
      });
    }

   deleteService(id: string) {
      return this.http.delete(this.baseUrl + '/Services' + '/' + id,
      {
        headers: this.authHeaders
      });
    }
}
