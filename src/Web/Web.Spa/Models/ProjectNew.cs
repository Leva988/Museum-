using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class ProjectNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }

        public string DepartmentId { get; set; }

        public string ServiceId { get; set; }
    }
}
