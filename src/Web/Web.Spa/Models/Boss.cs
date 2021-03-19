using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Boss
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }

    }
}
