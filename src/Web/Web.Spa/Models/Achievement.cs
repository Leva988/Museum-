using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Achievement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public DateTime Year { get; set;}

        public string Category { get; set; }

        public string CategoryId { get; set; }

    }
}