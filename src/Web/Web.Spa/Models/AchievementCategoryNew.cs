using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class AchievementCategoryNew
    {
        public string Name { get; set; }


        [Range(0, int.MaxValue, ErrorMessage = "Индекс < 0")]

        public int Index { get; set; }

    }
}
