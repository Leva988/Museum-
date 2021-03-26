using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Department
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string ShortName { get; set; }

        public string StructureId { get; set; }

        public string Description { get; set; }

        public int EmployeesNumber { get; set; }

        public IEnumerable<string> Sectors { get; set; }

    }
}
