using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class HistoryMilestone
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime DateStart {get; set;}

        public DateTime DateEnd {get; set;}

        public string Description {get; set;}

         public List<string> Items { get; set; }
    }
}