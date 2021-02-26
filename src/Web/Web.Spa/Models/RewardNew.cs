using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class RewardNew
    {
        
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }


    }
}
