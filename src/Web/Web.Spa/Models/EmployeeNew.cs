using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class EmployeeNew
    {
        [Required(ErrorMessage = "Name is not assigned")]
        public string Name { get; set; }

        public string Position { get; set; }

        public string DepartmentId { get; set; }

        public Region Region { get; set; }

        public EmployeeType Type { get; set; }
    }
}
