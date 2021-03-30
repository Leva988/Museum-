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

        public IMongoCollection<Boss> Bosses =>
            _database.GetCollection<Boss>("Bosses");

        public IMongoCollection<RewardedEmployee> RewardedEmployees =>
             _database.GetCollection<RewardedEmployee>("RewardedEmployees");

        public IMongoCollection<Reward> Rewards =>
             _database.GetCollection<Reward>("Rewards");

        public GridFSBucket RewardPhotos => 
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "reward-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );

        public GridFSBucket EmployeePhotos =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "employee-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
            );
        
        public GridFSBucket BossPhotos =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "boss-photos",
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

        public IMongoCollection<CorporateMonth> CorporateMonths =>
            _database.GetCollection<CorporateMonth>("CorporateMonths");

        public GridFSBucket CorporateMonthPhotos =>
             new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "corporate-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
             );
       
        public IMongoCollection<CorporateYear> CorporateYears =>
            _database.GetCollection<CorporateYear>("CorporateYears");

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

        public IMongoCollection<Structure> Structures =>
         _database.GetCollection<Structure>("Structures");
        
        public IMongoCollection<Production> Productions =>
         _database.GetCollection<Production>("Productions");

        public GridFSBucket ProductionIcons =>
            new GridFSBucket(
                _database,
                new GridFSBucketOptions
                {
                    BucketName = "production-photos",
                    ChunkSizeBytes = _deafultChunkSize,
                }
             );

        public IMongoCollection<HistoryMilestone> HistoryMileStones => 
                _database.GetCollection<HistoryMilestone>("HistoryMileStones");

    }
}
