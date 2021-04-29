using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace  Belorusneft.Museum.Web.Spa.Models
{
    public class GalleryVideo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public Uri Url { get; set; }

        public DateTime? Date { get; set; }

        public string CategoryId { get; set; }

        public string Category { get; set; }

    }
}