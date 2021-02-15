using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class ServiceNew
    {
        [Required(ErrorMessage = "Category is not assigned")]
        public string CategoryId { get; set; }

        public string Name { get; set; }

    }
}
