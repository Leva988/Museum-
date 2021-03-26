using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Structure
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string BossPosition { get; set; }

        public IEnumerable<string> Heads { get; set; } 

        public IEnumerable<Department> Departments { get; set; } 

    }
}
