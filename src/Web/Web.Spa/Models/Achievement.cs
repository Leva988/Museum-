using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Achievement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public AchievementType Type { get; set; }


    }
}