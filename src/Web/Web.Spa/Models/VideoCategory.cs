using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class VideoCategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<GalleryVideo> Videos {get; set;}
                    
    }
}
