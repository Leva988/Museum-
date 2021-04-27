import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthToken } from './auth/auth.token';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Achievement } from '../models/achievement';
import { RewardedEmployeeNew } from '../models/rewardedemployeeNew';
import { Reward } from '../models/reward';
import { Project } from '../models/project';
import { GalleryCategory } from '../models/galleryCategory';
import { Gallery } from '../models/gallery';
import { CorporateYear } from '../models/corporateyear';
import { CorporateMonth } from '../models/corporatemonth';
import { HistoryMilestone } from '../models/historymilestones';
import { Department } from '../models/department';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AchievementCategory } from '../models/achievementcategory';
import { Boss } from '../models/boss';

@Component({
templateUrl: 'admin.component.html',
styleUrls: ['admin.component.scss'],
providers: [AuthComponent]
})

@Injectable()
export class AdminComponent  {
   baseUrl: string;
   authHeaders: HttpHeaders;
   constructor(private router: Router, private token: AuthToken, private http: HttpClient, private cookie: CookieService) {
      this.baseUrl = environment.backendUrl;
      this.authHeaders = new HttpHeaders().set('Authorization', `Bearer ${cookie.get('token')}`);
    }

   logout() {
      if (confirm('Вы хотите покинуть страницу? Данные авторизации будут утеряны!')) {
       this.cookie.remove('token');
       this.router.navigateByUrl('/admin/auth');
      }
    }

  // Employee Panel
  getEmployees() {
    return this.http.get(this.baseUrl + '/employees');
  }

  getEmployee(id: string) {
      return  this.http.get(this.baseUrl + '/Employees' + '/' + id, {responseType: 'json'});
  }

  addEmployee(emp: Employee) {
      return this.http.post(this.baseUrl + '/Employees/Employee', emp,
      {
        headers: this.authHeaders
      });
    }

  updateEmployee(id: string, emp: Employee) {
      delete emp.id;
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

  // Department Panel
  getDepartments() {
    return this.http.get(this.baseUrl + '/Departments');
  }

  getSubstructure() {
    return this.http.get(this.baseUrl + '/SubStructure');
  }

  getDepartment(id: string) {
      return  this.http.get(this.baseUrl + '/Departments' + '/' + id, {responseType: 'json'});
  }

  addDepartment(dep: Department) {
      return this.http.post(this.baseUrl + '/Departments', dep,
      {
        headers: this.authHeaders
      });
    }

  updateDepartment(id: string, dep: Department) {
      delete dep.id;
      return this.http.put(this.baseUrl + '/Departments' + '/' + id, dep,
      {
        headers: this.authHeaders
      });
    }

  deleteDepartment(id: string) {
      return this.http.delete(this.baseUrl + '/Departments' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  getDepartmentPhoto(id: string) {
      return  this.http.get(this.baseUrl + '/Departments' + '/' + id + '/Photo', {responseType: 'blob'});
  }

  addDepartmentPhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Departments/' + id + '/Photo', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteDepartmentPhoto(id: string) {
      return this.http.delete(this.baseUrl + '/Departments/' + id + '/Photo',
      {
        headers: this.authHeaders
      });
    }
  // Achievement Panel
  getAchievements() {
    return this.http.get(this.baseUrl + '/Achievements');
  }

  getAchievement(id: string) {
      return  this.http.get(this.baseUrl + '/Achievements' + '/' + id, {responseType: 'json'});
  }

  getAchievementImage(id: string) {
    return  this.http.get(this.baseUrl + '/Achievements' + '/' + id + '/Image', {responseType: 'blob'});
}


  addAchievement(ach: Achievement) {
      return this.http.post(this.baseUrl + '/Achievements', ach,
      {
        headers: this.authHeaders
      });
    }

  updateAchievement(id: string, ach: Achievement) {
      delete ach.id;
      return this.http.put(this.baseUrl + '/Achievements' + '/' + id, ach,
      {
        headers: this.authHeaders
      });
    }

  deleteAchievement(id: string) {
      return this.http.delete(this.baseUrl + '/Achievements' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  addAchievementImage(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Achievements/' + id + '/Image', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteAchievementImage(id: string) {
      return this.http.delete(this.baseUrl + '/Achievements' + '/' + id + '/Image',
      {
        headers: this.authHeaders
      });
    }

  // AchievementCategory Panel

  getAchievementCategories() {
    return this.http.get(this.baseUrl + '/AchievementCategories');
  }

  getAchievementCategory(id: string) {
      return  this.http.get(this.baseUrl + '/AchievementCategories' + '/' + id, {responseType: 'json'});
  }

  addAchievementCategory(ach: AchievementCategory) {
      return this.http.post(this.baseUrl + '/AchievementCategories', ach,
      {
        headers: this.authHeaders
      });
    }

  updateAchievementCategory(id: string, ach: AchievementCategory) {
      delete ach.id;
      return this.http.put(this.baseUrl + '/AchievementCategories' + '/' + id, ach,
      {
        headers: this.authHeaders
      });
    }

  deleteAchievementCategory(id: string) {
      return this.http.delete(this.baseUrl + '/AchievementCategories' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  // Rewarded Employees Panel

  getRewardedEmployees() {
    return this.http.get(this.baseUrl + '/RewardedEmployees');
  }

  getRewardbyID(id) {
    return this.http.get(this.baseUrl + '/Rewards' + id);
  }

  getRewardedEmployee(id: string) {
      return  this.http.get(this.baseUrl + '/RewardedEmployees' + '/' + id, {responseType: 'json'});
  }

  addRewardedEmployee(rew: RewardedEmployeeNew) {
      return this.http.post(this.baseUrl + '/RewardedEmployees/RewardedEmployee', rew,
      {
        headers: this.authHeaders
      });
    }

  updateRewardedEmployee(id: string, emp: RewardedEmployeeNew) {
      delete emp.id;
      return this.http.put(this.baseUrl + '/RewardedEmployees' + '/' + id, emp,
      {
        headers: this.authHeaders
      });
    }

  deleteRewardedEmployee(id: string) {
      return this.http.delete(this.baseUrl + '/RewardedEmployees' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  getRewardedEmployeePhoto(id: string) {
      return  this.http.get(this.baseUrl + '/RewardedEmployees' + '/' + id + '/Photo', {responseType: 'blob'});
  }

  addRewardedEmployeePhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/RewardedEmployees/' + id + '/Photo', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteRewardedEmployeePhoto(id: string) {
      return this.http.delete(this.baseUrl + '/RewardedEmployees/' + id + '/Photo',
      {
        headers: this.authHeaders
      });
    }

    // Rewards Panel
    getRewards() {
      return this.http.get(this.baseUrl + '/Rewards');
    }

    getReward(id: string) {
        return  this.http.get(this.baseUrl + '/Reward' + '/' + id, {responseType: 'json'});
    }

    addReward(reward: Reward) {
        return this.http.post(this.baseUrl + '/Rewards', reward,
        {
          headers: this.authHeaders
        });
      }

    updateReward(id: string, rew: Reward) {
        delete rew.id;
        return this.http.put(this.baseUrl + '/Rewards' + '/' + id, rew,
        {
          headers: this.authHeaders
        });
      }

    deleteReward(id: string) {
        return this.http.delete(this.baseUrl + '/Rewards' + '/' + id,
        {
          headers: this.authHeaders
        });
      }

    getRewardPhoto(id: string) {
        return  this.http.get(this.baseUrl + '/Rewards' + '/' + id + '/Photo', {responseType: 'blob'});
    }

    addRewardPhoto(id: string, file: File) {
        const formData: FormData = new FormData();
        formData.append('avatar', file, file.name);
        return this.http.post(this.baseUrl + '/Rewards/' + id + '/Photo', formData,
        {
          headers: this.authHeaders
        });
     }

    deleteRewardPhoto(id: string) {
        return this.http.delete(this.baseUrl + '/Rewards/' + id + '/Photo',
        {
          headers: this.authHeaders
        });
      }

  // Project panel
  getProjects() {
     return this.http.get(this.baseUrl + '/Projects');
   }

   getProject(id: string) {
       return  this.http.get(this.baseUrl + '/Projects' + '/' + id, {responseType: 'json'});
   }

   addProject(proj: Project) {
       return this.http.post(this.baseUrl + '/Projects', proj,
       {
         headers: this.authHeaders
       });
     }

   updateProject(id: string, proj: Project) {
       delete proj.id;
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

   addProjectImage(id: string, file: File) {
       const formData: FormData = new FormData();
       formData.append('avatar', file, file.name);
       return this.http.post(this.baseUrl + '/Projects/' + id + '/Image', formData,
       {
         headers: this.authHeaders
       });
    }

   deleteProjectImage(id: string, photoId: string) {
       return this.http.delete(this.baseUrl + '/Projects' + '/' + id + '/item/' + photoId,
       {
         headers: this.authHeaders
       });
     }

    // GalleryCategory Panel
    getGalleryCategories() {
        return this.http.get(this.baseUrl + '/GalleryCategories');
      }

    getGalleryCategoryById(id: string) {
          return  this.http.get(this.baseUrl + '/GalleryCategories' + '/' + id, {responseType: 'json'});
      }

    addGalleryCategory(cat: GalleryCategory) {
        return this.http.post(this.baseUrl + '/GalleryCategories', cat,
        {
          headers: this.authHeaders
        });
      }
    updateGalleryCategory(id: string, cat: GalleryCategory) {
        delete cat.id;
        return this.http.put(this.baseUrl + '/GalleryCategories' + '/' + id, cat,
        {
          headers: this.authHeaders
        });
      }
    deleteGalleryCategory(id: string) {
        return this.http.delete(this.baseUrl + '/GalleryCategories' + '/' + id,
        {
          headers: this.authHeaders
        });
      }

   // Gallery Panel
   getGalleries() {
     return this.http.get(this.baseUrl + '/Galleries');
   }

   getGallery(id: string) {
       return  this.http.get(this.baseUrl + '/Galleries' + '/' + id, {responseType: 'json'});
   }

  addGallery(gal: Gallery) {
      return this.http.post(this.baseUrl + '/Galleries', gal,
      {
        headers: this.authHeaders
      });
    }

  updateGallery(id: string, gal: Gallery) {
      delete gal.id;
      return this.http.put(this.baseUrl + '/Galleries' + '/' + id, gal,
      {
        headers: this.authHeaders
      });
    }

  deleteGallery(id: string) {
      return this.http.delete(this.baseUrl + '/Galleries' + '/' + id,
      {
      headers: this.authHeaders
    });
  }

  addGalleryPhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Galleries/' + id + '/item', formData,
      {
        headers: this.authHeaders
      });
   }

  getGalleryItemDescription(id: string, itemId: string) {
      return this.http.get(this.baseUrl + '/Galleries/' + id + '/itemDescription/' + itemId, {responseType: 'text'});
  }

  deleteGalleryPhoto(id: string, itemId: string) {
      return this.http.delete(this.baseUrl + '/Galleries/' + id + '/item/' + itemId,
      {
        headers: this.authHeaders
      });
    }

   // CorporateYear Panel
   getCorporateYears() {
     return this.http.get(this.baseUrl + '/CorporateYears');
   }

  getCorporateYearById(id: string) {
       return  this.http.get(this.baseUrl + '/CorporateYears' + '/' + id, {responseType: 'json'});
   }

   addCorporateYear(year: CorporateYear) {
       return this.http.post(this.baseUrl + '/CorporateYears', year,
       {
         headers: this.authHeaders
       });
     }

   updateCorporateYear(id: string, year: CorporateYear) {
       delete year.id;
       return this.http.put(this.baseUrl + '/CorporateYears' + '/' + id, year,
       {
         headers: this.authHeaders
       });
     }

   deleteCorporateYear(id: string) {
       return this.http.delete(this.baseUrl + '/CorporateYears' + '/' + id,
       {
         headers: this.authHeaders
       });
     }

        // CorporateMonth Panel
  getMonths() {
     return this.http.get(this.baseUrl + '/CorporateMonths');
   }

  getCorporateMonth(id: string) {
       return  this.http.get(this.baseUrl + '/CorporateMonths' + '/' + id, {responseType: 'json'});
   }

  addCorporateMonth(month: CorporateMonth) {
       return this.http.post(this.baseUrl + '/CorporateMonths', month,
       {
         headers: this.authHeaders
       });
     }

  updateCorporateMonth(id: string, month: CorporateMonth) {
       delete month.id;
       return this.http.put(this.baseUrl + '/CorporateMonths' + '/' + id, month,
       {
         headers: this.authHeaders
       });
     }

  deleteCorporateMonth(id: string) {
       return this.http.delete(this.baseUrl + '/CorporateMonths' + '/' + id,
       {
         headers: this.authHeaders
       });
     }

  addCorporatePhoto(id: string, file: File) {
       const formData: FormData = new FormData();
       formData.append('avatar', file, file.name);
       return this.http.post(this.baseUrl + '/CorporateMonths/' + id + '/Photo', formData,
       {
         headers: this.authHeaders
       });
    }

  deleteCorporatePhoto(id: string, itemId: string) {
       return this.http.delete(this.baseUrl + '/CorporateMonths/' + id + '/Photo/' + itemId,
       {
         headers: this.authHeaders
       });
  }

  // Achievement Panel
  getHistoryMilestones() {
    return this.http.get(this.baseUrl + '/HistoryMilestones');
  }

  getHistoryMilestone(id: string) {
      return  this.http.get(this.baseUrl + '/HistoryMilestones' + '/' + id, {responseType: 'json'});
  }

  addHistoryMilestone(hist: HistoryMilestone) {
      return this.http.post(this.baseUrl + '/HistoryMilestones', hist,
      {
        headers: this.authHeaders
      });
    }

  updateHistoryMilestone(id: string, hist: HistoryMilestone) {
      delete hist.id;
      return this.http.put(this.baseUrl + '/HistoryMilestones' + '/' + id, hist,
      {
        headers: this.authHeaders
      });
    }

  deleteHistoryMilestone(id: string) {
      return this.http.delete(this.baseUrl + '/HistoryMilestones' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  getHistoryPhotoDescription(id: string, photoId: string) {
    return this.http.get(this.baseUrl + '/HistoryMilestones' + '/' + id + '/itemDescription/' + photoId,
    {
      headers: this.authHeaders,
      responseType: 'text'
    });
  }

  addHistoryImage(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/HistoryMilestones/' + id + '/item', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteHistoryImage(id: string, photoId: string) {
      return this.http.delete(this.baseUrl + '/HistoryMilestones' + '/' + id + '/item/' + photoId,
      {
        headers: this.authHeaders
      });
    }

  // Boss

  getBosses() {
    return this.http.get(this.baseUrl + '/Bosses');
  }

  getBoss(id: string) {
      return  this.http.get(this.baseUrl + '/Bosses' + '/' + id, {responseType: 'json'});
  }

  addBoss(boss: Boss) {
      return this.http.post(this.baseUrl + '/Bosses', boss,
      {
        headers: this.authHeaders
      });
    }

  updateBoss(id: string, boss: Boss) {
      delete boss.id;
      return this.http.put(this.baseUrl + '/Bosses' + '/' + id, boss,
      {
        headers: this.authHeaders
      });
    }

  deleteBoss(id: string) {
      return this.http.delete(this.baseUrl + '/Bosses' + '/' + id,
      {
        headers: this.authHeaders
      });
    }

  getBossPhoto(id: string) {
      return  this.http.get(this.baseUrl + '/Bosses' + '/' + id + '/Photo', {responseType: 'blob'});
  }

  addBossPhoto(id: string, file: File) {
      const formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(this.baseUrl + '/Bosses/' + id + '/Photo', formData,
      {
        headers: this.authHeaders
      });
   }

  deleteBossPhoto(id: string) {
      return this.http.delete(this.baseUrl + '/Bosses/' + id + '/Photo',
      {
        headers: this.authHeaders
      });
    }
}
