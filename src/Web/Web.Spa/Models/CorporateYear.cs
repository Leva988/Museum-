using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class CorporateYear
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public int Year { get; set; }

        public IEnumerable<CorporateMonth> Months { get; set; }
        
    }
}
