using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Belorusneft.Museum.Web.Spa.Models
{
    public class EconomyMonth
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Month { get; set; }

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
