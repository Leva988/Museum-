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

        #region Boss
        public async Task<IEnumerable<Boss>> GetBossesAsync() =>
            await _context.Bosses
                .Find(_ => true)
                .SortBy(c => c.DateEnd)
                .ToListAsync();
        
        public async Task InsertBossAsync(Boss boss) =>
                await _context.Bosses
                      .InsertOneAsync(boss);

        public async Task CreateOrUpdateBossAsync(Boss boss) =>
            await _context.Bosses
                .ReplaceOneAsync(x => x.Id == boss.Id,
                boss,
                new ReplaceOptions
                {
                    IsUpsert = true,
                }
            );

        public async Task<Boss> GetBossAsync(string id) =>
            await _context.Bosses
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteBossAsync(string id)
        {           
            var actionResult = await _context.Bosses
                .DeleteOneAsync(b => b.Id == id); 
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetBossPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.BossPhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.BossPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddBossPhotoAsync(Stream stream, string id, string contentType)
        {
            var emp = await GetBossAsync(id);
            if (emp == null)
            {
                return null;
            }

            var itemId = await _context.BossPhotos
                .UploadFromStreamAsync(
                    id,
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

        public async Task DeleteBossPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.BossPhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.BossPhotos.DeleteAsync(info.Id);  

        }
        #endregion

        #region Veteran
        public async Task<IEnumerable<Veteran>> GetVeteransAsync() =>
            await _context.Veterans
                .Find(_ => true)
                .SortBy(c => c.DateEnd)
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

        #region RewardedEmployee
        public async Task<IEnumerable<RewardedEmployee>> GetRewardedEmployeesAsync() =>
            await _context.RewardedEmployees
                .Find(_ => true)
                .SortBy(c => c.DateEnd)
                .ToListAsync();

        public async Task<IEnumerable<RewardedEmployee>> GetRewardedEmployeesByRewardAsync(string rewardId) =>
            await _context.RewardedEmployees
                .Aggregate()
                .Match(Builders<RewardedEmployee>.Filter.ElemMatch(r => r.Rewards, a => a.RewardId == rewardId))
                .SortBy(c => c.DateEnd)
                .ToListAsync();
       
        public async Task InsertRewardedEmployeeAsync(RewardedEmployee emp) =>
                await _context.RewardedEmployees
                      .InsertOneAsync(emp);

        public async Task InsertManyRewardedEmployees(IEnumerable<RewardedEmployee> emps) =>
            await _context.RewardedEmployees
            .InsertManyAsync(emps);

        public async Task CreateOrUpdateRewardedEmployeeAsync(RewardedEmployee emp) =>
            await _context.RewardedEmployees
                .ReplaceOneAsync(x => x.Id == emp.Id,
                emp,
                new ReplaceOptions
                {
                    IsUpsert = true,
                }
            );

        public async Task<RewardedEmployee> GetRewardedEmployeeAsync(string id) =>
            await _context.RewardedEmployees
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteRewardedEmployeeAsync(string id)
        {
            var actionResult = await _context.RewardedEmployees
                .DeleteOneAsync(b => b.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetRewardedEmployeePhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.RewardedPhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.RewardedPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> AddRewardedEmployeePhotoAsync(Stream stream, string id, string contentType)
        {
            var vet = await GetRewardedEmployeeAsync(id);
            if (vet == null)
            {
                return null;
            }

            var itemId = await _context.RewardedPhotos
                .UploadFromStreamAsync(
                    id,
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

        public async Task DeleteRewardedEmployeePhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.RewardedPhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.RewardedPhotos.DeleteAsync(info.Id);

        }
        #endregion

        #region Rewards
        
        public async Task<IEnumerable<Reward>> GetAllRewardsAsync() =>
              await _context.Rewards
                  .Find(_ => true)
                  .SortBy(c => c.Id)
                  .ToListAsync();
        public async Task<Reward> GetRewardAsync(string id) =>
            await _context.Rewards
             .Find(x => x.Id == id)
             .FirstOrDefaultAsync();

        public async Task AddRewardAsync(Reward reward) =>
          await _context.Rewards.InsertOneAsync(reward);

        public async Task UpdateRewardAsync(Reward reward) =>
           await _context.Rewards
              .ReplaceOneAsync(x => x.Id == reward.Id,
              reward,
              new ReplaceOptions
              {
                  IsUpsert = true,
              });

        public async Task<bool> DeleteRewardAsync(string id)
        {
            var actionResult = await _context.Rewards
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        
        public async Task<FileStreamResult> GetRewardPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = await _context.RewardPhotos
                .Find(filter)
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.RewardPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();

            return new FileStreamResult(stream, contentType);
        }

        public async Task<string> AddRewardPhotoAsync(Stream stream, string id, string contentType)
        {
            var rew = await GetRewardAsync(id);
            if (rew == null)
            {
                return null;
            }

            var itemId = await _context.RewardPhotos
                .UploadFromStreamAsync(
                    id,
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

        public async Task DeleteRewardPhotoAsync(string name)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq(info => info.Filename, name);
            var info = _context.RewardPhotos
                .Find(filter)
                .FirstOrDefault();
            await _context.RewardPhotos.DeleteAsync(info.Id);  
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

        public async Task<FileStreamResult> GetProjectImageAsync(string id, string itemId)
        {
            var info = await _context.ProjectPhotos
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();

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

            var update = Builders<Project>.Update.AddToSet(x => x.Items, itemId.ToString());
            await _context.Projects.UpdateOneAsync(x => x.Id == projId, update);

            return itemId.ToString();
        }

        public async Task DeleteProjectImageAsync(string id, string itemId)
        {
            var proj = await GetProjectAsync(id);
            var items = proj.Items.Where(el => el != itemId);
            var update = Builders<Project>.Update.Set(x => x.Items, items);
            await _context.Projects.UpdateOneAsync(x => x.Id == id, update);
            await _context.ProjectPhotos.DeleteAsync(ObjectId.Parse(itemId));       
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

        public async Task<FileStreamResult> GetAchievementImageAsync(string id, string itemId)
        {
            var info = await _context.AchievementImages
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.AchievementImages.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;
            var contentType = info.Metadata.GetValue("Content-Type").ToString();
            return new FileStreamResult(stream, contentType);

        }

        public async Task<string> GetAchievemenItemDescriptionAsync(string achId, string itemId)
        {
            var info = await _context.AchievementImages
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();
            var name = info.Filename;
            return name;
        }

        public async Task<string> AddAchievementImageAsync(Stream stream, string achievementId, string contentType, string filename)
        {
            var ach = await GetAchievementAsync(achievementId);
            if (ach == null)
            {
                return null;
            }
            string extension = System.IO.Path.GetExtension(filename);
            string name =  filename.Substring(0, filename.Length - extension.Length);
            var itemId = await _context.AchievementImages
                .UploadFromStreamAsync(
                    name,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType}
                        },
                    }
                );

            var update = Builders<Achievement>.Update.AddToSet(x => x.Items, itemId.ToString());
            await _context.Achievements.UpdateOneAsync(x => x.Id == achievementId, update);

            return itemId.ToString();
        }

        public async Task DeleteAchievementImageAsync(string id, string itemId)
        {
            var hist = await GetAchievementAsync(id);
            var items = hist.Items.Where(el => el != itemId);
            var update = Builders<Achievement>.Update.Set(x => x.Items, items);
            await _context.Achievements.UpdateOneAsync(x => x.Id == id, update);
            await _context.AchievementImages.DeleteAsync(ObjectId.Parse(itemId));

        }
        #endregion

        #region Gallery
        public async Task<IEnumerable<Gallery>> GetGalleriesAsync() =>
            await _context.Galleries.Find(_ => true)
                .SortBy(c => c.Date)
                .ToListAsync();

        public async Task InsertGalleryAsync(Gallery gallery) =>
            await _context.Galleries
                .InsertOneAsync(gallery);

        public async Task CreateOrUpdateGalleryAsync(Gallery gallery) {
            var filter = Builders<Gallery>.Filter.Eq(x => x.Id, gallery.Id);
            var update = Builders<Gallery>.Update
                .Set(x => x.Name, gallery.Name)
                .Set(x => x.Date, gallery.Date);             
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
        
         public async Task<IEnumerable<Gallery>> GetGalleriesByCategoryAsync(string category) =>
            await _context.Galleries
                .Find(x => x.CategoryId == category)
                .SortBy(x => x.Date)
                .ToListAsync();

        public async Task<bool> DeleteGalleryAsync(string id)
        {
            var gallery = await GetGalleryAsync(id);
            if (gallery != null && gallery.Items.Count() > 0){
            foreach (var i in gallery.Items)
                {
                    await DeleteGalleryItemAsync(id, i);
                }
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

        #region GalleryCategory
        public async Task<IEnumerable<GalleryCategory>> GetGalleryCategories() =>
            await _context.GalleryCategories.Find(_ => true)
                .ToListAsync();

        public async Task InsertGalleryCategoryAsync(GalleryCategory cat) =>
            await _context.GalleryCategories
                .InsertOneAsync(cat);

        public async Task CreateOrUpdateGalleryCategoryAsync(GalleryCategory cat) {
            var filter = Builders<GalleryCategory>.Filter.Eq(x => x.Id, cat.Id);
            var update = Builders<GalleryCategory>.Update
                .Set(x => x.Name, cat.Name);            
            await _context.GalleryCategories.UpdateOneAsync(
                filter,
                update,
                new UpdateOptions()
                {
                    IsUpsert = true
                });
        }

        public async Task<GalleryCategory> GetGalleryCategoryAsync(string id) =>
            await _context.GalleryCategories
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteGalleryCategoryAsync(string id)
        {
            var cat = await GetGalleryCategoryAsync(id);
           var actionResult = await _context.GalleryCategories
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        #endregion

        #region HistoryMilestone
        public async Task<IEnumerable<HistoryMilestone>> GetHistoryMilestones() =>
            await _context.HistoryMileStones.Find(_ => true)
                .SortBy(c => c.DateEnd)
                .ToListAsync();

        public async Task InsertHistoryMilestoneAsync(HistoryMilestone hist) =>
            await _context.HistoryMileStones
                .InsertOneAsync(hist);

        public async Task CreateOrUpdateMilestoneAsync(HistoryMilestone hist) {
            var filter = Builders<HistoryMilestone>.Filter.Eq(x => x.Id, hist.Id);
            var update = Builders<HistoryMilestone>.Update
                .Set(x => x.DateStart, hist.DateStart)
                .Set(x => x.DateEnd, hist.DateEnd)
                .Set(x => x.Description, hist.Description);            
            await _context.HistoryMileStones.UpdateOneAsync(
                filter,
                update,
                new UpdateOptions()
                {
                    IsUpsert = true
                });
        }

        public async Task<HistoryMilestone> GetHistoryMilestoneAsync(string id) =>
            await _context.HistoryMileStones
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteHistoryMilestoneAsync(string id)
        {
            var history = await GetHistoryMilestoneAsync(id);
            if (history != null && history.Items.Count() > 0) 
            {
                foreach (var i in history.Items)
                {
                    await DeleteHistoryItemAsync(id, i);
                }
            }         
            var actionResult = await _context.HistoryMileStones
                .DeleteOneAsync(p => p.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public async Task<FileStreamResult> GetHistoryItemAsync(string histId, string itemId)
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

        public async Task<string> GetHistoryItemDescriptionAsync(string histId, string itemId)
        {
            var info = await _context.HistoryPhotos
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();
            var name = info.Filename;
            return name;
        }

        public async Task<string> AddHistoryItemAsync(Stream stream, string histId, string contentType, string filename)
        {
            var history = await GetHistoryMilestoneAsync(histId);
            if (history == null)
            {
                return null;
            }
            string extension = System.IO.Path.GetExtension(filename);
            string name =  filename.Substring(0, filename.Length - extension.Length);
            var itemId = await _context.HistoryPhotos
                .UploadFromStreamAsync(
                    name,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType}
                        },
                    }
                );

            var update = Builders<HistoryMilestone>.Update.AddToSet(x => x.Items, itemId.ToString());
            await _context.HistoryMileStones.UpdateOneAsync(x => x.Id == histId, update);

            return itemId.ToString();
        }

        public async Task DeleteHistoryItemAsync(string histId, string itemId)
        {
            var hist = await GetHistoryMilestoneAsync(histId);
            var items = hist.Items.Where(el => el != itemId);
            var update = Builders<HistoryMilestone>.Update.Set(x => x.Items, items);
            await _context.HistoryMileStones.UpdateOneAsync(x => x.Id == histId, update);
            await _context.HistoryPhotos.DeleteAsync(ObjectId.Parse(itemId));
        }
        #endregion

        #region CorporateMonth
        public async Task<IEnumerable<CorporateMonth>> GetCorporateMonthsAsync() =>
            await _context.CorporateMonths.Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task <IEnumerable<CorporateMonth>> GetCorporateMonthsByYearAsync(string yearId) =>
            await _context.CorporateMonths.Find(x => x.YearId == yearId)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task InsertCorporateMonthAsync(CorporateMonth month) =>
        await _context.CorporateMonths
              .InsertOneAsync(month);

        public async Task CreateOrUpdateCorporateMonthAsync(CorporateMonth month)
        {
            var filter = Builders<CorporateMonth>.Filter.Eq(x => x.Id , month.Id);
            var update = Builders<CorporateMonth>.Update
                .Set(x => x.Name, month.Name)
                .Set(x => x.Description, month.Description);    
            await _context.CorporateMonths.UpdateOneAsync(
                filter,
                update, 
                new UpdateOptions()
                {
                    IsUpsert = true
                });
        }

        public async Task<CorporateMonth> GetCorporateMonthAsync(string id) =>
            await _context.CorporateMonths
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task<bool> DeleteCorporateMonthAsync(string id)
        {           
            var actionResult = await _context.CorporateMonths
                .DeleteOneAsync(p => p.Id == id);           
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        
        public async Task<FileStreamResult> GetCorporateMonthPhotoAsync(string id, string itemId)
        {
           var info = await _context.CorporateMonthPhotos
                .Find(new BsonDocument("_id", ObjectId.Parse(itemId)))
                .FirstAsync();

            var stream = new MemoryStream();
            await _context.CorporateMonthPhotos.DownloadToStreamAsync(info.Id, stream);
            stream.Position = 0;

            var contentType = info.Metadata.GetValue("Content-Type").ToString();
            return new FileStreamResult(stream, contentType);
        }

        public async Task<string> AddCorporateMonthPhotoAsync(Stream stream, string id, string contentType)
        {
            var corp = await GetCorporateMonthAsync(id);
            if (corp == null)
            {
                return null;
            }

            var itemId = await _context.CorporateMonthPhotos
                .UploadFromStreamAsync(
                    id,
                    stream,
                    new GridFSUploadOptions
                    {
                        Metadata = new BsonDocument
                        {
                            {"Content-Type", contentType},
                        },
                    }
                ); 
            var update = Builders<CorporateMonth>.Update.AddToSet(x => x.Items, itemId.ToString());
            await _context.CorporateMonths.UpdateOneAsync(x => x.Id == id, update);

            return itemId.ToString();
        }

        public async Task DeleteCorporateMonthPhotoAsync(string id, string itemId)
        {
            var cat = await GetCorporateMonthAsync(id);
            var items = cat.Items.Where(el => el != itemId);
            var update = Builders<CorporateMonth>.Update.Set(x => x.Items, items);
            await _context.CorporateMonths.UpdateOneAsync(x => x.Id == id, update);
            await _context.CorporateMonthPhotos.DeleteAsync(ObjectId.Parse(itemId));
        }
        #endregion

        #region CorporateYear
        public async Task<IEnumerable<CorporateYear>> GetCorporateYearsAsync() {
            var years = await _context.CorporateYears.Find(_ => true)
                .SortBy(c => c.Year)
                .ToListAsync();
            if (years.Count() != 0) {
                foreach (CorporateYear year in years) {
                   year.Months = await GetCorporateMonthsByYearAsync(year.Id);
                }           
            }
            return years;
        }

        public async Task InsertCorporateYearAsync(CorporateYear year) =>
            await _context.CorporateYears
              .InsertOneAsync(year);

        public async Task CreateOrUpdateCorporateYearAsync(CorporateYear year)
        {
            var filter = Builders<CorporateYear>.Filter.Eq(x => x.Id , year.Id);
            var update = Builders<CorporateYear>.Update
                .Set(x => x.Year, year.Year);  
            await _context.CorporateYears.UpdateOneAsync(
                filter,
                update, 
                new UpdateOptions()
                {
                    IsUpsert = true
                });
        }

        public async Task<CorporateYear> GetCorporateYearAsync(string id) {
            var year =  await _context.CorporateYears
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();
            if (year != null) {
                year.Months = await GetCorporateMonthsByYearAsync(id);
            }
            return year;
        }

        public async Task<bool> DeleteCorporateYearAsync(string id)
        {           
            var actionResult = await _context.CorporateYears
                .DeleteOneAsync(p => p.Id == id);           
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
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

        public async Task<IEnumerable<Department>> GetDepartmentsByStructureAsync(string structureId) =>
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

        #region SubStructure
        public async Task<IEnumerable<SubStructure>> GetSubStructuresAsync() =>
            await _context.SubStructure
                .Find(_ => true)
                .SortBy(c => c.Id)
                .ToListAsync();

        public async Task<IEnumerable<SubStructure>> GetSubStructuresByStructureId(string structureId) =>
            await _context.SubStructure
                    .Find(sub => sub.StructureId == structureId)
                    .SortBy(s => s.Id)
                    .ToListAsync();

        public async Task InsertSubStructureAsync(SubStructure subStructure) =>
             await _context.SubStructure
                   .InsertOneAsync(subStructure);

        public async Task<SubStructure> GetSubStructureAsync(string id) =>
            await _context.SubStructure
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();

        public async Task UpdateSubStructureAsync(SubStructure subStructure) =>
            await _context.SubStructure
               .ReplaceOneAsync(x => x.Id == subStructure.Id,
               subStructure,
               new ReplaceOptions
               {
                   IsUpsert = true,
               });

        public async Task<bool> DeleteSubStructureAsync(string id)
        {
            var actionResult = await _context.SubStructure
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
