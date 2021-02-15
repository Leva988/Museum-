export class EconomyMonth {
    public id: string;
    public month: string;
    public departmentId: string;
    public innerVolume: number;
    public outerVolume: number;
    public servicePrice: number;
    public expenses: {
      laborCosts: number,
      amortization: number,
      mainAmortization: number,
      otherServices: number
    };
    financialResults: {
      result: number,
      rentability: number
    };
    salary: number;
    salaryDollar: number;
    work: number;
    workDollar: number;
 }
