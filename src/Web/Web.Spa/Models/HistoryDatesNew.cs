using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class HistoryDatesNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public IEnumerable<Dates> Dates { get; set; }
    }
}
