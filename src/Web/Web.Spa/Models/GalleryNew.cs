using System;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class GalleryNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public DateTime Date { get; set; }

        public string CategoryId { get; set; } 

        public bool withDescription { get; set; }
    }
}