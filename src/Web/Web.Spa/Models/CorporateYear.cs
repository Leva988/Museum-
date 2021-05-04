using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class CorporateYear
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Год < 0")]
        
        public int Year { get; set; }

        public IEnumerable<CorporateMonth> Months { get; set; }
        
    }
}
