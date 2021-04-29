using System;

namespace  Belorusneft.Museum.Web.Spa.Models
{
    public class GalleryVideoNew
    {
        public string Name { get; set; }

        public Uri Url { get; set; }
        
        public DateTime? Date { get; set; }

        public string CategoryId { get; set; }

    }
}