using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Position { get; set; }

        public string DepartmentId { get; set; }

        public string Department { get; set; }
        
        public EmployeeType Type { get; set; }

    }
}
