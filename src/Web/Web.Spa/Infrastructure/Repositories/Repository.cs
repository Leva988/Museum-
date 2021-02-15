using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using Microsoft.AspNetCore.Mvc;

namespace Belorusneft.Museum.Web.Spa.Infrastructure.Repositories
{
    public class Repository: IRepository
    { 
        private readonly Context _context;

        public Repository(IOptions<Settings> settings)
        {
            _context = new Context(settings);
        }

        #region Employee
        public async Task<IEnumerable<Employee>> GetEmployeesAsync() =>
            await _context.Employees
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();
        
        public async Task InsertEmployeeAsync(Employee emp) =>
                await _context.Employees
                      .InsertOneAsync(emp);

        public async Task InserManytEmployeesAsync(IEnumerable<Employee> employees) =>
            await _context.Employees
            .InsertManyAsync(employees);

        public async Task CreateOrUpdateEmployeeAsync(Employee employee) =>
            await _context.Employees
                .ReplaceOneAsync(x => x.Id == employee.Id,
                employee,
                new ReplaceOptions
                {
                    IsUpsert = true,
                }
            );

        public async Task<Employee> GetEmployeeAsync(string id) =>
            await _context.Employees
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<IEnumerable<Employee>> GetEmployeeByDepartment(string depId) =>
            await _context.Employees
                .Find(x => x.DepartmentId == depId)
                .SortBy(x => x.Id)
                .ToListAsync();

        public async Task<bool> DeleteEmployeeAsync(string id)
        {           
            var actionResult = await _context.Employees
                .DeleteOneAsync(b => b.Id == id); 
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetEmployeePhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.EmployeePhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.EmployeePhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddEmployeePhotoAsync(Stream stream, string employeeId, string contentType)
        {
            var emp = await GetEmployeeAsync(employeeId);
            if (emp == null)
            {
                return null;
            }

            var itemId = await _context.EmployeePhotos
                .UploadFromStreamAsync(
                    employeeId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );
            return itemId.ToString();
        }

        public async Task DeleteEmployeePhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.EmployeePhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.EmployeePhotos.DeleteAsync(info.Id);  

        }
        #endregion

        #region Veteran
        public async Task<IEnumerable<Veteran>> GetVeteransAsync() =>
            await _context.Veterans
                .Find(_ => true)
                .SortBy(c => c.FireDate)
                .ToListAsync();


        public async Task InsertVeteranAsync(Veteran veteran) =>
                await _context.Veterans
                      .InsertOneAsync(veteran);

        public async Task InsertManyVeterans(IEnumerable<Veteran> veterans) =>
            await _context.Veterans
            .InsertManyAsync(veterans);

        public async Task CreateOrUpdateVeteranAsync(Veteran veteran) =>
            await _context.Veterans
                .ReplaceOneAsync(x => x.Id == veteran.Id,
                veteran,
                new ReplaceOptions
                {
                    IsUpsert = true,
                }
            );

        public async Task<Veteran> GetVeteranAsync(string id) =>
            await _context.Veterans
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteVeteranAsync(string id)
        {
            var actionResult = await _context.Veterans
                .DeleteOneAsync(b => b.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetVeteranPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.VeteranPhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.VeteranPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddVeteranPhotoAsync(Stream stream, string veteranId, string contentType)
        {
            var vet = await GetVeteranAsync(veteranId);
            if (vet == null)
            {
                return null;
            }

            var itemId = await _context.VeteranPhotos
                .UploadFromStreamAsync(
                    veteranId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );
            return itemId.ToString();
        }

        public async Task DeleteVeteranPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.VeteranPhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.VeteranPhotos.DeleteAsync(info.Id);

        }
        #endregion

        #region Projects
        public async Task<IEnumerable<Project>> GetProjectsAsync() =>
            await _context.Projects
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertProjectAsync(Project proj) =>
               await _context.Projects
                     .InsertOneAsync(proj);

        public async Task<IEnumerable<Project>> GetProjectsByDepartment(string depId) =>
          await _context.Projects
              .Find(x => x.DepartmentId == depId)
              .SortBy(x => x.Id)
              .ToListAsync();

        public async Task<IEnumerable<Project>> GetProjectsByService(string servId) =>
            await _context.Projects
              .Find(x => x.ServiceId == servId)
              .SortBy(x => x.Id)
              .ToListAsync();

        public async Task CreateOrUpdateProjectAsync(Project project) =>
            await _context.Projects
                .ReplaceOneAsync(x => x.Id == project.Id,
                project, 
                new ReplaceOptions
                {
                    IsUpsert = true,
                });

        public async Task<Project> GetProjectAsync(string id) =>
            await _context.Projects
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteProjectAsync(string id)
        {
            var actionResult = await _context.Projects
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetProjectImageAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.ProjectPhotos
                .Find(filter)
                .FirstOrDefaultAsync();

            var stream = new MemoryStream();
            await _context.ProjectPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();
            
            return new FileStreamResult(stream, contentType);
        }

        public async Task<string> AddProjectImageAsync(Stream stream, string projId, string contentType)
        {
            var proj = await GetProjectAsync(projId);
            if (proj == null)
            {
                return null;
            }

            var itemId = await _context.ProjectPhotos
                .UploadFromStreamAsync(
                    projId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );
            return itemId.ToString();
        }

        public async Task DeleteProjectImageAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.ProjectPhotos
                .Find(filter)
                .FirstAsync();
            await _context.ProjectPhotos.DeleteAsync(info.Id);          
        }
        #endregion

        #region ServiceCategories
        public async Task<IEnumerable<ServiceCategory>> GetServiceCategoriesAsync() =>
            await _context.ServiceCategory
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertServiceCategoryAsync(ServiceCategory cat) =>
             await _context.ServiceCategory
                   .InsertOneAsync(cat);

        public async Task<ServiceCategory> GetServiceCategoryAsync(string id) =>
            await _context.ServiceCategory
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task UpdateServiceCategoryAsync(ServiceCategory category) =>
            await _context.ServiceCategory
               .ReplaceOneAsync(x => x.Id == category.Id,
               category,
               new ReplaceOptions
               {
                   IsUpsert = true,
               });      

        public async Task<bool> DeleteServiceCategoryAsync(string id)
        {
            var actionResult = await _context.ServiceCategory
                .DeleteOneAsync(p => p.Id == id);

            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        
        #endregion

        #region Services
        
        public async Task<IEnumerable<Service>> GetAllServicesAsync() =>
              await _context.Service
                  .Find(_ => true)
                  .SortBy(c => c.Id)
                  .ToListAsync();
        public async Task<Service> GetServiceAsync(string id) =>
            await _context.Service
             .Find(x => x.Id == id)
             .FirstOrDefaultAsync();

        public async Task<IEnumerable<Service>> GetServicesAsync(string categoryId) =>
            await _context.Service
                .Find(x => x.CategoryId == categoryId)
                .ToListAsync();

        public async Task AddServiceAsync(Service service) =>
          await _context.Service.InsertOneAsync(service);

        public async Task UpdateServiceAsync(Service service) =>
           await _context.Service
              .ReplaceOneAsync(x => x.Id == service.Id,
              service,
              new ReplaceOptions
              {
                  IsUpsert = true,
              });

        public async Task<bool> DeleteServiceAsync(string id)
        {
            var actionResult = await _context.Service
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        #endregion

        #region Achievements
        public async Task<IEnumerable<Achievement>> GetAchievementsAsync() =>
            await _context.Achievements
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertAchievementAsync(Achievement achievement) =>
            await _context.Achievements
                .InsertOneAsync(achievement);

        public async Task CreateOrUpdateAchievementAsync(Achievement ach) =>
            await _context.Achievements.ReplaceOneAsync(x => x.Id == ach.Id,
                ach,
                new ReplaceOptions 
                {
                    IsUpsert = true,
                });

        public async Task<Achievement> GetAchievementAsync(string id) =>
            await _context.Achievements
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteAchievementAsync(string id)
        {    
            var actionResult = await _context.Achievements
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetAchievementImageAsync(string filename)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, filename);
            var info = await _context.AchievementImages
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.AchievementImages.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();
            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddAchievementImageAsync(Stream stream, string achievementId, string contentType)
        {
            var ach = await GetAchievementAsync(achievementId);
            if (ach == null)
            {
                return null;
            }

            var itemId = await _context.AchievementImages
                .UploadFromStreamAsync(
                    achievementId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );

            return itemId.ToString();
        }

        public async Task DeleteAchievementImageAsync(string filename)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, filename);
            var info = await _context.AchievementImages
                .Find(filter)
                .FirstAsync();
            await _context.AchievementImages.DeleteAsync(info.Id);

        }
        #endregion

        #region HistoryDates
        public async Task<IEnumerable<HistoryDates>> GetHistoryDatesAsync() =>
            await _context.HistoryDates
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertHistoryDateAsync(HistoryDates hist) =>
               await _context.HistoryDates
                     .InsertOneAsync(hist);

        public async Task CreateOrUpdateHistoryDateAsync(HistoryDates historyDates) =>
            await _context.HistoryDates.ReplaceOneAsync(x => x.Id == historyDates.Id,
                historyDates,
                new ReplaceOptions
                {
                    IsUpsert = true,
                });

        public async Task<HistoryDates> GetHistoryDateAsync(string id) =>
            await _context.HistoryDates
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync(); 

        public async Task<bool> DeleteHistoryDateAsync(string id)
        {
            var actionResult = await _context.HistoryDates
                .DeleteOneAsync(p => p.Id == id);

            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        #endregion

        #region HistoryRefs
        public async Task<IEnumerable<HistoryRef>> GetAllHistoryRefsAsync() =>
            await _context.HistoryRef.Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertHistoryRefAsync(HistoryRef hist) =>
            await _context.HistoryRef
                  .InsertOneAsync(hist);

        public async Task CreateOrUpdateHistoryRefAsync(HistoryRef historyRef) =>
            await _context.HistoryRef.ReplaceOneAsync(x => x.Id == historyRef.Id,
                historyRef,
                new ReplaceOptions
                {
                    IsUpsert = true,
                });

        public async Task<HistoryRef> GetHistoryRefAsync(string id) =>
            await _context.HistoryRef
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteHistoryRef(string id)
        {
            var actionResult = await _context.HistoryRef
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetHistoryPhotosAsync(string historyId, string itemId)
        {
            var info = await _context.HistoryPhotos
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.HistoryPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();
            return new FileStreamResult(stream, contentType);
        }

        public async Task<string> AddHistoryPhotoAsync(Stream stream, string historyId, string contentType)
        {
            var history = await GetHistoryRefAsync(historyId);
            if (history == null)
            {
                return null;
            }

            var itemId = await _context.HistoryPhotos
                .UploadFromStreamAsync(
                    historyId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );

            var update = Builders<HistoryRef>.Update.AddToSet(x => x.Items, itemId.ToString());
            await _context.HistoryRef.UpdateOneAsync(x => x.Id == historyId, update);

            return itemId.ToString();
        }

        public async Task DeleteHistoryPhoto(string historyId,string itemId)
        {
            var gall = await GetHistoryRefAsync(historyId);
            var items = gall.Items.Where(el => el != itemId);
            var update = Builders<HistoryRef>.Update.Set(x => x.Items, items);
            await _context.HistoryRef.UpdateOneAsync(x => x.Id == historyId, update);
            await _context.HistoryPhotos.DeleteAsync(ObjectId.Parse(itemId));
        }
        #endregion

        #region Gallery
        public async Task<IEnumerable<Gallery>> GetGalleriesAsync() =>
            await _context.Galleries.Find(_ => true)
                .SortBy(c => c.Date)
                .ToListAsync();

        public async Task<IEnumerable<Gallery>> GetGalleriesByCategoryAsync(string categoryId) =>
           await _context.Galleries.Find(x => x.CategoryId == categoryId)
               .SortBy(c => c.Date)
               .ToListAsync();

        public async Task InserttGalleryAsync(Gallery gallery) =>
            await _context.Galleries
                .InsertOneAsync(gallery);

        public async Task CreateOrUpdateGalleryAsync(Gallery gallery) {
            var filter = Builders<Gallery>.Filter.Eq(x => x.Id, gallery.Id);
            var update = Builders<Gallery>.Update
                .Set(x => x.Name, gallery.Name)
                .Set(x => x.Date, gallery.Date)
                .Set(x => x.CategoryId, gallery.CategoryId);               
            await _context.Galleries.UpdateOneAsync(
                filter,
                update,
                new UpdateOptions()
                {
                    IsUpsert = true
                });
        }

        public async Task<Gallery> GetGalleryAsync(string id) =>
            await _context.Galleries
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteGalleryAsync(string id)
        {
            var gallery = await GetGalleryAsync(id);
            foreach (var i in gallery.Items)
            {
                await DeleteGalleryItemAsync(id, i);
            }
            var actionResult = await _context.Galleries
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetGalleryItemAsync(string galleryId, string itemId)
        {
            var info = await _context.GalleryContent
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.GalleryContent.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();
            return new FileStreamResult(stream, contentType);
        }

        public async Task<string> AddGalleryItemAsync(Stream stream, string galleryId, string contentType)
        {
            var gallery = await GetGalleryAsync(galleryId);
            if (gallery == null)
            {
                return null;
            }

            var itemId = await _context.GalleryContent
                .UploadFromStreamAsync(
                    galleryId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );

            var update = Builders<Gallery>.Update.AddToSet(x => x.Items, itemId.ToString());
            await _context.Galleries.UpdateOneAsync(x => x.Id == galleryId, update);

            return itemId.ToString();
        }

        public async Task DeleteGalleryItemAsync(string galleryId, string itemId)
        {
            var gall = await GetGalleryAsync(galleryId);
            var items = gall.Items.Where(el => el != itemId);
            var update = Builders<Gallery>.Update.Set(x => x.Items, items);
            await _context.Galleries.UpdateOneAsync(x => x.Id == galleryId, update);
            await _context.GalleryContent.DeleteAsync(ObjectId.Parse(itemId));
        }
        #endregion

        #region SocialCategory
        public async Task<IEnumerable<SocialCategory>> GetSocialCategoriesAsync() =>
            await _context.SocialCategories.Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertSocialCategoryAsync(SocialCategory ev) =>
        await _context.SocialCategories
              .InsertOneAsync(ev);

        public async Task CreateOrUpdateSocialCategoryAsync(SocialCategory ev)
        {
            var filter = Builders<SocialCategory>.Filter.Eq(x => x.Id , ev.Id);
            var update = Builders<SocialCategory>.Update
                .Set(x => x.Name, ev.Name)
                .Set(x => x.Description, ev.Description);    
            await _context.SocialCategories.UpdateOneAsync(
                filter,
                update, 
                new UpdateOptions()
                {
                    IsUpsert = true
                });
        }

        public async Task<SocialCategory> GetSocialCategoryAsync(string id) =>
            await _context.SocialCategories
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteSocialCategoryAsync(string id)
        {           
            var actionResult = await _context.SocialCategories
                .DeleteOneAsync(p => p.Id == id);           
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        
        public async Task<FileStreamResult> GetSocialCategoryPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.SocialCategoryPhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.SocialCategoryPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddSocialCategoryPhotoAsync(Stream stream, string socialCategoryId, string contentType)
        {
            var social = await GetSocialCategoryAsync(socialCategoryId);
            if (social == null)
            {
                return null;
            }

            var itemId = await _context.SocialCategoryPhotos
                .UploadFromStreamAsync(
                    socialCategoryId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );
            return itemId.ToString();
        }

        public async Task DeleteSocialCategoryPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.SocialCategoryPhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.SocialCategoryPhotos.DeleteAsync(info.Id);

        }
        #endregion

        #region Departments

        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync() =>
         await _context.Departments.Find(_ => true)
             .SortBy(d => d.Id)
             .ToListAsync();

        public async Task<Department> GetDepartmentAsync(string id) =>
            await _context.Departments
             .Find(x => x.Id == id)
             .FirstOrDefaultAsync();

        public async Task<IEnumerable<Department>> GetDepartmentsAsync(string structureId) =>
            await _context.Departments
                .Find(x => x.StructureId == structureId)
                .ToListAsync();

        public async Task AddDepartmentAsync(Department department) =>
          await _context.Departments.InsertOneAsync(department);

        public async Task UpdateDepartmentAsync(Department department) =>
           await _context.Departments
              .ReplaceOneAsync(x => x.Id == department.Id,
              department,
              new ReplaceOptions
              {
                  IsUpsert = true,
              });

        public async Task<bool> DeleteDepartmentAsync(string id)
        {
            var actionResult = await _context.Departments
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetDepartmentPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.DepartmentPhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.DepartmentPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddDepartmentPhotoAsync(Stream stream, string depId, string contentType)
        {
            var dep = await GetDepartmentAsync(depId);
            if (dep == null)
            {
                return null;
            }

            var itemId = await _context.DepartmentPhotos
                .UploadFromStreamAsync(
                    depId,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                );
            return itemId.ToString();
        }

        public async Task DeleteDepartmentPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.DepartmentPhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.DepartmentPhotos.DeleteAsync(info.Id);

        }
        #endregion

        #region Structure
        public async Task<IEnumerable<Structure>> GetStructuresAsync() =>
            await _context.Structure
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertStructureAsync(Structure structure) =>
             await _context.Structure
                   .InsertOneAsync(structure);

        public async Task<Structure> GetStructureAsync(string id) =>
            await _context.Structure
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task UpdateStructureAsync(Structure structure) =>
            await _context.Structure
               .ReplaceOneAsync(x => x.Id == structure.Id,
               structure,
               new ReplaceOptions
               {
                   IsUpsert = true,
               });

        public async Task<bool> DeleteStructureAsync(string id)
        {
            var actionResult = await _context.Structure
                .DeleteOneAsync(p => p.Id == id);

            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        #endregion

        #region EconomyYears
        public async Task<IEnumerable<EconomyYear>> GetEconomyYearsAsync() =>
            await _context.EconomyYears
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertEconomyYearAsync(EconomyYear year) =>
             await _context.EconomyYears
                   .InsertOneAsync(year);

        public async Task<EconomyYear> GetEconomyYearAsync(string id) =>
            await _context.EconomyYears
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();
            
         public async Task<IEnumerable<EconomyYear>> GetEconomyYearsByDepartment(string depId) =>
            await _context.EconomyYears
                .Find(x => x.DepartmentId == depId)
                .SortBy(x => x.Id)
                .ToListAsync();

        public async Task UpdateEconomyYearAsync(EconomyYear year) =>
            await _context.EconomyYears
               .ReplaceOneAsync(x => x.Id == year.Id,
               year,
               new ReplaceOptions
               {
                   IsUpsert = true,
               });

        public async Task<bool> DeleteEconomyYearAsync(string id)
        {
            var actionResult = await _context.EconomyYears
                .DeleteOneAsync(p => p.Id == id);

            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        #endregion

        #region EconomyMonth
        public async Task<IEnumerable<EconomyMonth>> GetEconomyMonthsAsync() =>
            await _context.EconomyMonths
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task<IEnumerable<EconomyMonth>> GetEconomyMonthsByDepartment(string depId) =>
            await _context.EconomyMonths
                .Find(x => x.DepartmentId == depId)
                .SortBy(x => x.Id)
                .ToListAsync();


        public async Task InsertEconomyMonthAsync(EconomyMonth month) =>
             await _context.EconomyMonths
                   .InsertOneAsync(month);

        public async Task<EconomyMonth> GetEconomyMonthAsync(string id) =>
            await _context.EconomyMonths
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task UpdateEconomyMonthAsync(EconomyMonth month) =>
            await _context.EconomyMonths
               .ReplaceOneAsync(x => x.Id == month.Id,
               month,
               new ReplaceOptions
               {
                   IsUpsert = true,
               });

        public async Task<bool> DeleteEconomyMonthAsync(string id)
        {
            var actionResult = await _context.EconomyMonths
                .DeleteOneAsync(p => p.Id == id);

            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        #endregion
        
    }
}
