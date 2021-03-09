using Belorusneft.Museum.Web.Spa.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Belorusneft.Museum.Web.Spa.Infrastructure
{
    public class Context
    {
        private readonly IMongoDatabase _database;
        private readonly bool IsReplicaSet;
        private readonly int _deafultChunkSize = 1048576;

        public Context(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);

            IsReplicaSet = client.Cluster.Settings.ReplicaSetName != null;

            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Employee> Employees =>
            _database.GetCollection<Employee>("Employees");

        public IMongoCollection<Veteran> Veterans =>
             _database.GetCollection<Veteran>("Veterans");

        public IMongoCollection<RewardedEmployee> RewardedEmployees =>
             _database.GetCollection<RewardedEmployee>("RewardedEmployees");

        public IMongoCollection<Reward> Rewards =>
             _database.GetCollection<Reward>("Rewards");

        public GridFSBucket EmployeePhotos =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "employee-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );

        public GridFSBucket VeteranPhotos =>
           new GridFSBucket(
               _database,
               new GridFSBucketOptions
               {
                   BucketName = "veteran-photos",
                   ChunkSizeBytes = _deafultChunkSize,
               }
           );
        
        public GridFSBucket RewardedPhotos =>
           new GridFSBucket(
               _database,
               new GridFSBucketOptions
               {
                   BucketName = "rewarded-photos",
                   ChunkSizeBytes = _deafultChunkSize,
               }
           );

        public IMongoCollection<ServiceCategory> ServiceCategory
            => _database.GetCollection<ServiceCategory>("ServiceCategories");

        public IMongoCollection<Service> Service =>
            _database.GetCollection<Service>("Services");

        public GridFSBucket HistoryPhotos =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "history-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );

        public IMongoCollection<Project> Projects =>
            _database.GetCollection<Project>("Projects");

        public GridFSBucket ProjectPhotos =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "project-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );

        public IMongoCollection<Achievement> Achievements =>
            _database.GetCollection<Achievement>("Achievements");

        public GridFSBucket AchievementImages =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "achievement-images",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );

        public IMongoCollection<Gallery> Galleries =>
            _database.GetCollection<Gallery>("Galleries");

         public IMongoCollection<GalleryCategory> GalleryCategories =>
            _database.GetCollection<GalleryCategory>("GalleryCategories");


        public GridFSBucket GalleryContent =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "gallery-content",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );

        public IMongoCollection<SocialCategory> SocialCategories =>
            _database.GetCollection<SocialCategory>("SocialCategories");

        public GridFSBucket SocialCategoryPhotos =>
             new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "social-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
             );

        public IMongoCollection<Department> Departments =>
          _database.GetCollection<Department>("Departments");

        public GridFSBucket DepartmentPhotos =>
            new GridFSBucket(
               _database,
               new GridFSBucketOptions
               {
                   BucketName = "department-photos",
                   ChunkSizeBytes = _deafultChunkSize,
               }
            );

        public IMongoCollection<Structure> Structure =>
         _database.GetCollection<Structure>("Structures");

        public IMongoCollection<SubStructure> SubStructure =>
         _database.GetCollection<SubStructure>("SubStructures");

        public IMongoCollection<EconomyYear> EconomyYears =>
          _database.GetCollection<EconomyYear>("EconomyYears");

        public IMongoCollection<EconomyMonth> EconomyMonths =>
                  _database.GetCollection<EconomyMonth>("EconomyMonths");

        public IMongoCollection<HistoryMilestone> HistoryMileStones => 
                _database.GetCollection<HistoryMilestone>("HistoryMileStones");

    }
}
