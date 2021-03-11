using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Service
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required(ErrorMessage = "Category is not assigned")]
        public string CategoryId { get; set; }

        public string Name { get; set; }
        
    }
}
