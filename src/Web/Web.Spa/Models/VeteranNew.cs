using System;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class VeteranNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Position { get; set; }

        public DateTime BirthDay { get; set; }

        public DateTime RecruitDate { get; set; }

        public DateTime FireDate { get; set; }
    }
}
