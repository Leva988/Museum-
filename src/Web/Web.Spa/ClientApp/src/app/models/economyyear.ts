import { Expenses } from './expenses';
import { FinancialResults } from './finresults';

export class EconomyYear {
   public id: string;
   public year: string;
   public departmentId: string;
   public innerVolume: number;
   public outerVolume: number;
   public servicePrice: number;
   public expenses: Expenses;
   public financialResults: FinancialResults;
   public salary: number;
   public salaryDollar: number;
   public work: number;
   public workDollar: number;
}
