using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Reward
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public IEnumerable<RewardedEmployee> RewardedEmployees  { get; set; }
    }
}

