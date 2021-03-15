using Belorusneft.Museum.Web.Spa.Models;
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

        #region Veteran
        Task<IEnumerable<Veteran>> GetVeteransAsync();

        Task<Veteran> GetVeteranAsync(string id);     

        Task InsertVeteranAsync(Veteran veteran);

        Task InsertManyVeterans(IEnumerable<Veteran> veterans);

        Task CreateOrUpdateVeteranAsync(Veteran veteran);

        Task<bool> DeleteVeteranAsync(string id);

        Task<FileStreamResult> GetVeteranPhotoAsync(string id);

        Task DeleteVeteranPhotoAsync(string id);

        Task<string> AddVeteranPhotoAsync(Stream stream, string veteranId, string contentType);
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

        #region ServiceCategories

        Task<IEnumerable<ServiceCategory>> GetServiceCategoriesAsync();

        Task<ServiceCategory> GetServiceCategoryAsync(string id);

        Task InsertServiceCategoryAsync(ServiceCategory category);

        Task UpdateServiceCategoryAsync(ServiceCategory category);

        Task<bool> DeleteServiceCategoryAsync(string id);

        #endregion

        #region Services      

        Task<IEnumerable<Service>> GetAllServicesAsync();

        Task<Service> GetServiceAsync(string id);

        Task<IEnumerable<Service>> GetServicesAsync(string category);       

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

        Task<string> AddDepartmentPhotoAsync(Stream stream, string employeeId, string contentType);
        #endregion

        #region Structures

        Task<IEnumerable<Structure>> GetStructuresAsync();

        Task<Structure> GetStructureAsync(string id);

        Task InsertStructureAsync(Structure structure);

        Task UpdateStructureAsync(Structure structure);

        Task<bool> DeleteStructureAsync(string id);
        #endregion

        #region SubStructures

        Task<IEnumerable<SubStructure>> GetSubStructuresAsync();

        Task<SubStructure> GetSubStructureAsync(string id);

        Task<IEnumerable<SubStructure>> GetSubStructuresByStructureId(string structureId);

        Task InsertSubStructureAsync(SubStructure subStructure);

        Task UpdateSubStructureAsync(SubStructure subStructure);

        Task<bool> DeleteSubStructureAsync(string id);
        #endregion

        #region EconomyYear
        Task<IEnumerable<EconomyYear>> GetEconomyYearsAsync();

        Task<EconomyYear> GetEconomyYearAsync(string id);

        Task<IEnumerable<EconomyYear>> GetEconomyYearsByDepartment(string depId);

        Task InsertEconomyYearAsync(EconomyYear year);

        Task UpdateEconomyYearAsync(EconomyYear year);

        Task<bool> DeleteEconomyYearAsync(string id);
        #endregion

        #region EconomyMonth
        Task<IEnumerable<EconomyMonth>> GetEconomyMonthsAsync();

        Task<EconomyMonth> GetEconomyMonthAsync(string id);

        Task<IEnumerable<EconomyMonth>> GetEconomyMonthsByDepartment(string depId);

        Task InsertEconomyMonthAsync(EconomyMonth month);

        Task UpdateEconomyMonthAsync(EconomyMonth month);

        Task<bool> DeleteEconomyMonthAsync(string id);
        #endregion

    }
}
