using System.Collections.Generic;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class DepartmentNew
    {
        public string Name { get; set; }

        public string ShortName { get; set; }

        public string StructureId { get; set; }

        public string Description { get; set; }

        public IEnumerable<string> Sectors { get; set; }

    }
}
