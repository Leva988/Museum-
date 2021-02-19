using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Veteran
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Position { get; set; }

        public DateTime BirthDay { get; set; }

        public DateTime? RecruitDate { get; set; }

        public DateTime? DateEnd { get; set; }

    }
}
