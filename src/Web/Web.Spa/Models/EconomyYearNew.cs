namespace Belorusneft.Museum.Web.Spa.Models
{
    public class EconomyYearNew
    {
        public string Year { get; set; }

        public string DepartmentId { get; set; }

        public double InnerVolume { get; set; }

        public double OuterVolume { get; set; }

        public double ServicePrice { get; set; }

        public Expenses Expenses { get; set; }

        public FinancialResults FinancialResults { get; set; }

        public double Salary { get; set; }

        public double SalaryDollar { get; set; }

        public double Work { get; set; }

        public double WorkDollar { get; set; }
    }
}
