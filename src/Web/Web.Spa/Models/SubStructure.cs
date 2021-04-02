using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace  Belorusneft.Museum.Web.Spa.Models
{
    public class SubStructure
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int Number { get; set; }

        public string  BossPosition { get; set; }

        public string BossName { get; set; }

        public string StructureId {get; set;}

        public IEnumerable<Department> Departments { get; set; } 

    }
}
