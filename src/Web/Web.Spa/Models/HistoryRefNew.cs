using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class HistoryRefNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public List<string> Description { get; set; }

    }
}
