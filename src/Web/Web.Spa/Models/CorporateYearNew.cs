using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class CorporateYearNew
    {
        [Range(0, int.MaxValue, ErrorMessage = "Год < 0")]
        public int Year { get; set; }
        
    }
}
