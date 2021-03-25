using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class Production
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
       public string Name { get; set; }

        public IEnumerable<string> Items  { get; set; }
        
    }
}
