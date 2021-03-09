using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class GalleryCategoryNew
    {

        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }
                    
    }
}
