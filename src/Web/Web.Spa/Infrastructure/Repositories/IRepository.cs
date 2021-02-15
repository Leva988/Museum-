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

        #region Project
        Task<IEnumerable<Project>> GetProjectsAsync();

        Task<Project> GetProjectAsync(string id);

        Task<IEnumerable<Project>> GetProjectsByDepartment(string depId);

        Task<IEnumerable<Project>> GetProjectsByService(string servId);

        Task InsertProjectAsync(Project proj);

        Task CreateOrUpdateProjectAsync(Project project);

        Task<bool> DeleteProjectAsync(string id);

        Task<FileStreamResult> GetProjectImageAsync(string filename);

        Task<string> AddProjectImageAsync(Stream stream, string id, string contentType);

        Task DeleteProjectImageAsync(string filename);
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
        
        Task<FileStreamResult> GetAchievementImageAsync(string id);

        Task<string> AddAchievementImageAsync(Stream stream, string achievementId, string contentType);

        Task DeleteAchievementImageAsync(string id);
        #endregion

        #region HistoryDates
        Task<IEnumerable<HistoryDates>> GetHistoryDatesAsync();
        
        Task<HistoryDates> GetHistoryDateAsync(string id);

        Task InsertHistoryDateAsync(HistoryDates hist);

        Task CreateOrUpdateHistoryDateAsync(HistoryDates date);

        Task<bool> DeleteHistoryDateAsync(string id);
        #endregion

        #region HistoryRef
        Task<IEnumerable<HistoryRef>> GetAllHistoryRefsAsync();

        Task<HistoryRef> GetHistoryRefAsync(string id);

        Task InsertHistoryRefAsync(HistoryRef historyRef);

        Task CreateOrUpdateHistoryRefAsync(HistoryRef historyRef);

        Task<bool> DeleteHistoryRef(string id);

        Task<FileStreamResult> GetHistoryPhotosAsync(string historyRefId, string itemId);

        Task<string> AddHistoryPhotoAsync(Stream stream, string historyRefId, string contentType);

        Task DeleteHistoryPhoto(string historyRefId, string itemId);
        #endregion

        #region Gallery
        Task<IEnumerable<Gallery>> GetGalleriesAsync();

        Task<IEnumerable<Gallery>> GetGalleriesByCategoryAsync(string categoryId);

        Task<Gallery> GetGalleryAsync(string galleryId);

        Task InserttGalleryAsync(Gallery gallery);

        Task CreateOrUpdateGalleryAsync(Gallery gallery);

        Task<bool> DeleteGalleryAsync(string galleryId);

        Task<FileStreamResult> GetGalleryItemAsync(string galleryId, string itemId);

        Task<string> AddGalleryItemAsync(Stream stream, string galleryId, string contentType);

        Task DeleteGalleryItemAsync(string galleryId, string itemId);
        #endregion

        #region SocialCategory
        Task<IEnumerable<SocialCategory>> GetSocialCategoriesAsync();

        Task<SocialCategory> GetSocialCategoryAsync(string id);

        Task InsertSocialCategoryAsync(SocialCategory ev);

        Task CreateOrUpdateSocialCategoryAsync(SocialCategory ev);

        Task<bool> DeleteSocialCategoryAsync(string id);

        Task<FileStreamResult> GetSocialCategoryPhotoAsync(string socialcategoryId);

        Task<string> AddSocialCategoryPhotoAsync(Stream stream, string socialcategoryId, string contentType);

        Task DeleteSocialCategoryPhotoAsync(string socialCategoryId);
        #endregion

        #region Departments      

        Task<IEnumerable<Department>> GetAllDepartmentsAsync();

        Task<Department> GetDepartmentAsync(string id);

        Task<IEnumerable<Department>> GetDepartmentsAsync(string structure);

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
