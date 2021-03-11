using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class ProjectNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Description { get; set; }

    }
}
