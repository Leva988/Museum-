using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class CorporateMonthNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Description { get; set; }

        public string YearId { get; set; }

    }
}
