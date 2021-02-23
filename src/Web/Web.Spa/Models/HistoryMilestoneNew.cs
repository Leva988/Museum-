using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class HistoryMilestoneNew
    {
        public DateTime DateStart {get; set;}

        public DateTime DateEnd {get; set;}

        public string Description {get; set;}
        
    }
}