﻿using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Belorusneft.Museum.Web.Spa.Infrastructure.Repositories
{
    public interface IRepository
    {
        #region Employee
        Task<IEnumerable<Employee>> GetEmployeesAsync();

        Task<Employee> GetEmployeeAsync(string id);

        Task<IEnumerable<Employee>> GetEmployeeByDepartment(string depId);

        Task InsertEmployeeAsync(Employee employee);

        Task InserManytEmployeesAsync(IEnumerable<Employee> employees);

        Task CreateOrUpdateEmployeeAsync(Employee employee);

        Task<bool> DeleteEmployeeAsync(string id);

        Task<FileStreamResult> GetEmployeePhotoAsync(string id);

        Task DeleteEmployeePhotoAsync(string id);

        Task<string> AddEmployeePhotoAsync(Stream stream, string employeeId, string contentType);
        #endregion

        #region Boss
        Task<IEnumerable<Boss>> GetBossesAsync();

        Task<Boss> GetBossAsync(string id);

        Task InsertBossAsync(Boss boss);

        Task CreateOrUpdateBossAsync(Boss boss);

        Task<bool> DeleteBossAsync(string id);

        Task<FileStreamResult> GetBossPhotoAsync(string id);

        Task DeleteBossPhotoAsync(string id);

        Task<string> AddBossPhotoAsync(Stream stream, string id, string contentType);
        #endregion

        #region Production
        Task<IEnumerable<Production>> GetProductions();

        Task<Production> GetProductionAsync(string id);

        Task InsertProductionAsync(Production prod);

        Task CreateOrUpdateProductionAsync(Production prod);

        Task<bool> DeleteProductionAsync(string id);

        Task<FileStreamResult> GetProductionIconAsync(string id, string itemId);

        Task<string> GetProductionIconDescriptionAsync(string id, string itemId);

        Task<string> AddProductionIconAsync(Stream stream, string id, string contentType, string filename);

        Task DeleteProductionIconAsync(string id, string itemId);
        #endregion

        #region RewardedEmployee
        Task<IEnumerable<RewardedEmployee>> GetRewardedEmployeesAsync();

        Task<IEnumerable<RewardedEmployee>> GetRewardedEmployeesByRewardAsync(string rewardId);

        Task<RewardedEmployee> GetRewardedEmployeeAsync(string id);     

        Task InsertRewardedEmployeeAsync(RewardedEmployee emp);

        Task InsertManyRewardedEmployees(IEnumerable<RewardedEmployee> emps);

        Task CreateOrUpdateRewardedEmployeeAsync(RewardedEmployee emp);

        Task<bool> DeleteRewardedEmployeeAsync(string id);

        Task<FileStreamResult> GetRewardedEmployeePhotoAsync(string id);

        Task DeleteRewardedEmployeePhotoAsync(string id);

        Task<string> AddRewardedEmployeePhotoAsync(Stream stream, string id, string contentType);
        #endregion

        #region Rewards
        Task<IEnumerable<Reward>> GetAllRewardsAsync();

        Task<Reward> GetRewardAsync(string id);

        Task AddRewardAsync(Reward reward);

        Task UpdateRewardAsync(Reward reward);
        
        Task<bool> DeleteRewardAsync(string id);

        Task<FileStreamResult> GetRewardPhotoAsync(string id);

        Task DeleteRewardPhotoAsync(string id);

        Task<string> AddRewardPhotoAsync(Stream stream, string employeeId, string contentType);
        #endregion      

        #region Project
        Task<IEnumerable<Project>> GetProjectsAsync();

        Task<Project> GetProjectAsync(string id);

        Task InsertProjectAsync(Project proj);

        Task CreateOrUpdateProjectAsync(Project project);

        Task<bool> DeleteProjectAsync(string id);

        Task<FileStreamResult> GetProjectImageAsync(string id, string itemId);

        Task<string> AddProjectImageAsync(Stream stream, string id, string contentType);

        Task DeleteProjectImageAsync(string id, string itemId);
        #endregion

        #region Services      

        Task<IEnumerable<Service>> GetAllServicesAsync();

        Task<Service> GetServiceAsync(string id);

        Task AddServiceAsync(Service services);

        Task UpdateServiceAsync(Service service);
        
        Task<bool> DeleteServiceAsync(string id);
        #endregion

        #region Achievements
        Task<IEnumerable<Achievement>> GetAchievementsAsync();

        Task<Achievement> GetAchievementAsync(string id);

        Task CreateOrUpdateAchievementAsync(Achievement achievement);

        Task InsertAchievementAsync(Achievement achievement);

        Task<bool> DeleteAchievementAsync(string id);
        
        Task<FileStreamResult> GetAchievementImageAsync(string id, string itemId);

        Task<string> GetAchievemenItemDescriptionAsync(string id, string itemId);

        Task<string> AddAchievementImageAsync(Stream stream, string achievementId, string contentType,  string filename);

        Task DeleteAchievementImageAsync(string id, string itemId);
        #endregion

        #region Gallery
        Task<IEnumerable<Gallery>> GetGalleriesAsync();

        Task<Gallery> GetGalleryAsync(string galleryId);

        Task<IEnumerable<Gallery>> GetGalleriesByCategoryAsync(string id);

        Task InsertGalleryAsync(Gallery gallery);

        Task CreateOrUpdateGalleryAsync(Gallery gallery);

        Task<bool> DeleteGalleryAsync(string galleryId);

        Task<FileStreamResult> GetGalleryItemAsync(string galleryId, string itemId);

        Task<string> AddGalleryItemAsync(Stream stream, string galleryId, string contentType);

        Task DeleteGalleryItemAsync(string galleryId, string itemId);
        #endregion

        #region GalleryCategory
        Task<IEnumerable<GalleryCategory>> GetGalleryCategories();

        Task<GalleryCategory> GetGalleryCategoryAsync(string galleryId);

        Task InsertGalleryCategoryAsync(GalleryCategory cat);

        Task CreateOrUpdateGalleryCategoryAsync(GalleryCategory cat);

        Task<bool> DeleteGalleryCategoryAsync(string catId);
        #endregion

        #region HistoryMilestones
        Task<IEnumerable<HistoryMilestone>> GetHistoryMilestones();

        Task<HistoryMilestone> GetHistoryMilestoneAsync(string id);

        Task InsertHistoryMilestoneAsync(HistoryMilestone mile);

        Task CreateOrUpdateMilestoneAsync(HistoryMilestone milestone);

        Task<bool> DeleteHistoryMilestoneAsync(string id);

        Task<FileStreamResult> GetHistoryItemAsync(string id, string itemId);

        Task<string> GetHistoryItemDescriptionAsync(string id, string itemId);

        Task<string> AddHistoryItemAsync(Stream stream, string id, string contentType, string filename);

        Task DeleteHistoryItemAsync(string id, string itemId);
        #endregion

        #region CorporateMonth
        Task<IEnumerable<CorporateMonth>> GetCorporateMonthsAsync();

        Task<CorporateMonth> GetCorporateMonthAsync(string id);

        Task <IEnumerable<CorporateMonth>> GetCorporateMonthsByYearAsync (string yearId);

        Task InsertCorporateMonthAsync(CorporateMonth month);

        Task CreateOrUpdateCorporateMonthAsync(CorporateMonth month);

        Task<bool> DeleteCorporateMonthAsync(string id);

        Task<FileStreamResult> GetCorporateMonthPhotoAsync(string id, string itemId);

        Task<string> AddCorporateMonthPhotoAsync(Stream stream, string socialcategoryId, string contentType);

        Task DeleteCorporateMonthPhotoAsync(string id, string itemId);
        #endregion

        #region CorporateYear
        Task<IEnumerable<CorporateYear>> GetCorporateYearsAsync();

        Task<CorporateYear> GetCorporateYearAsync(string id);

        Task InsertCorporateYearAsync(CorporateYear year);

        Task CreateOrUpdateCorporateYearAsync(CorporateYear year);

        Task<bool> DeleteCorporateYearAsync(string id);
        #endregion

        #region Departments      

        Task<IEnumerable<Department>> GetAllDepartmentsAsync();

        Task<Department> GetDepartmentAsync(string id);

        Task<IEnumerable<Department>> GetDepartmentsByStructureAsync(string structure);

        Task AddDepartmentAsync(Department department);

        Task UpdateDepartmentAsync(Department department);

        Task<bool> DeleteDepartmentAsync(string id);

        Task<FileStreamResult> GetDepartmentPhotoAsync(string id);

        Task DeleteDepartmentPhotoAsync(string id);

        Task<string> AddDepartmentPhotoAsync(Stream stream, string id, string contentType);
        #endregion

        #region Structures

        Task<IEnumerable<Structure>> GetStructuresAsync();

        Task<Structure> GetStructureAsync(string id);

        Task InsertStructureAsync(Structure structure);

        Task UpdateStructureAsync(Structure structure);

        Task<bool> DeleteStructureAsync(string id);
        #endregion
       
    }
}
