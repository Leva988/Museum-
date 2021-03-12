using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class CorporateMonth
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Description { get; set; }

        public string YearId { get; set; }

        public IEnumerable<string> Items { get; set; }
    }
}
