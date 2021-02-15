import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department-service/department-service.service';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-grafic',
  templateUrl: './grafic.component.html',
  styleUrls: ['./grafic.component.scss'],
  providers: [DepartmentService]
})
export class GraficComponent implements OnInit {
  id;
  urlYear = environment.backendUrl + '/EconomyYears';
  urlMonth = environment.backendUrl + '/EconomyMonths';
  chart: Chart;
  InnerVolumesYear: number[] = [];
  InnerVolumesMonth: number[] = [];
  OuterVolumesYear: number[] = [];
  OuterVolumesMonth: number[] = [];
  ServicePriceYear: number[] = [];
  ServicePriceMonth: number[] = [];
  LaborCostsYear: number[] = [];
  AmortizationYear: number[] = [];
  MainAmortizationYear: number[] = [];
  OtherServicesYear: number[] = [];
  LaborCostsMonth: number[] = [];
  AmortizationMonth: number[] = [];
  MainAmortizationMonth: number[] = [];
  OtherServicesMonth: number[] = [];
  FinancialResultMonth: number[] = [];
  RentabilityMonth: number[] = [];
  FinancialResultYear: number[] = [];
  RentabilityYear: number[] = [];
  SalaryYear: number[] = [];
  SalaryYear$: number[] = [];
  SalaryMonth: number[] = [];
  SalaryMonth$: number[] = [];
  WorkYear: number[] = [];
  WorkYear$: number[] = [];
  WorkMonth: number[] = [];
  WorkMonth$: number[] = [];
  Months: string[] = [];
  Years: number[] = [];
  grafic;
  graficTab: string;
  constructor( private route: ActivatedRoute, private depService: DepartmentService, private sanitizer: DomSanitizer) {

     }

    ngOnInit() {
      this.grafic = document.getElementById('grafic');
      this.id = this.route.snapshot.params.id;
      this.getYears();
    }
     getYears() {
      this.depService.getInfo(this.urlYear).subscribe(
        (data: any[]) => {
          // tslint:disable: prefer-for-of
          for (let i = 0; i < data.length; i++ ) {
            if (data[i].departmentId === this.id) {
              this.Years.push(data[i].year);
              this.InnerVolumesYear.push(data[i].innerVolume);
              this.OuterVolumesYear.push(data[i].outerVolume);
              this.ServicePriceYear.push(data[i].servicePrice);
              this.LaborCostsYear.push(data[i].expenses.laborCosts);
              this.AmortizationYear.push(data[i].expenses.amortization);
              this.MainAmortizationYear.push(data[i].expenses.mainAmortization);
              this.OtherServicesYear.push(data[i].expenses.otherServices);
              this.FinancialResultYear.push(data[i].financialResults.result);
              this.RentabilityYear.push(data[i].financialResults.rentability);
              this.SalaryYear.push(data[i].salary);
              this.SalaryYear$.push(data[i].salaryDollar);
              this.WorkYear.push(data[i].work);
              this.WorkYear$.push(data[i].workDollar);
            }
          }
          this.getMonths();
        },
        // tslint:disable: no-shadowed-variable
        error => console.log(error)
      );
    }

    yearsChart() {
      this.chart = new Chart('servicepriceYear', {
        type: 'line',
        data: {
        labels: this.Years,
        datasets: [
          {
            data: this.ServicePriceYear,
            borderColor: '#294D8D',
            backgroundColor: '#96D8E5',
            hoverBackgroundColor: '#3cba9f',
            pointRadius: 15,
            fill: false
          }],
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
    });
      this.chart = new Chart('expensesYear', {
       type: 'line',
       data: {
        labels: this.Years,
        datasets: [
          {
            data: this.LaborCostsYear,
            label: 'расходы на оплату труда',
            borderColor: '#294D8D',
            backgroundColor: '#294D8D',
            hoverBackgroundColor: '#3cba9f',
            pointRadius: 10,
            fill: false
          },
          {
            data: this.AmortizationYear,
            label: 'амортизация фондов,расходы материалов, комплектующих, износ МБП',
            borderColor: '#00B5F9',
            backgroundColor: '#00B5F9',
            hoverBackgroundColor: '#3cba9f',
            pointRadius: 7,
            fill: false
          },
          {
            data: this.MainAmortizationYear,
            label: 'амортизация основных фондов',
            borderColor: '#F99300',
            backgroundColor: '#F99300',
            hoverBackgroundColor: '#3cba9f',
            pointRadius: 5,
            fill: false
          },
          {
            data: this.OtherServicesYear,
            label: 'услуги сторонних организаций',
            borderColor: '#0aa125',
            backgroundColor: '#0aa125',
            hoverBackgroundColor: '#3cba9f',
            pointRadius: 5,
            fill: false
          }
        ],
        },
        options: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 10,
              fontSize: 8,
              fontColor: 'black'}
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: true
              }
            }],
          }
        }
    });
      this.chart = new Chart('volumePeriod', {
        type: 'horizontalBar',
        data: {
          labels: this.Years,
          datasets: [
          {
            maxBarThickness: 100,
            label: 'внутренний объём (для РУП "ПО Белоруснефть" и его обособленных подразделений)',
            data: this.InnerVolumesYear,
            borderColor: '#3cba9f',
            backgroundColor: '#294D8D',
            fill: true
          },
          {
            maxBarThickness: 100,
            label: 'сторонний объём (включая объём пдля дочерних пердприятий и ОАО, входящих в ГПО "Белоруснефть"',
            data: this.OuterVolumesYear,
            borderColor: '#3cba9f',
            backgroundColor: '#96D8E5',
            fill: true
          }
        ]
     },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            fontSize: 8,
            fontColor: 'black'
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: true
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: true
            }
          }],
        }
    }
  });
      this.chart = new Chart('financesYear', {
        type: 'horizontalBar',
        data: {
        labels: this.Years,
        datasets: [
         {
           label: 'Результат',
           data: this.FinancialResultYear,
           backgroundColor: '#4c73d4',
           bordercolor: '#294D8D',
           fill: true
         },
         {
          label: 'Рентабельность затрат',
          data: this.RentabilityYear,
          backgroundColor: '#294D8D',
          bordercolor: '#294D8D',
          fill: true
        },
       ]
     },
     options: {
       legend: {
         display: true,
         position: 'bottom',
         labels: {
           boxWidth: 10,
           fontSize: 8,
           fontColor: 'black'
         }
       },
       scales: {
         xAxes: [{
           display: true,
           ticks: {
             suggestedMin: 0,
             beginAtZero: true
           }
         }],
         yAxes: [{
           display: true
         }],
       }
      }
     });
      this.chart = new Chart('salaryYear', {
        type: 'horizontalBar',
        data: {
          labels: this.Years,
          datasets: [
            {
              label: 'руб',
              data: this.SalaryYear,
              backgroundColor: '#294D8D',
              bordercolor: '#294D8D',
              fill: true
            },
            {
              label: '$',
              data: this.SalaryYear$,
              backgroundColor: '#15d5eb',
              bordercolor: '#294D8D',
              fill: true
            },
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 10,
              fontSize: 8,
              fontColor: 'black'
            }
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: false
              }
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      this.chart = new Chart('workYear', {
       type: 'horizontalBar',
       data: {
        labels: this.Years,
        datasets: [
          {
            label: 'руб',
            data: this.WorkYear,
            backgroundColor: '#294D8D',
            bordercolor: '#294D8D',
            fill: true
          },
          {
            label: '$',
            data: this.WorkYear$,
            backgroundColor: '#15d5eb',
            bordercolor: '#294D8D',
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            fontSize: 8,
            fontColor: 'black'
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: false
            }
          }],
          yAxes: [{
             display: true
              }],
            }
           }
        });
    }

    getMonths() {
      this.depService.getInfo(this.urlMonth).subscribe(
        (data: any) => {
          for (let i = 0; i < data.length; i++ ) {
            if (data[i].departmentId === this.id) {
              this.Months.push(data[i].month);
              this.InnerVolumesMonth.push(data[i].innerVolume);
              this.OuterVolumesMonth.push(data[i].outerVolume);
              this.ServicePriceMonth.push(data[i].servicePrice);
              this.LaborCostsMonth.push(data[i].expenses.laborCosts);
              this.AmortizationMonth.push(data[i].expenses.amortization);
              this.MainAmortizationMonth.push(data[i].expenses.mainAmortization);
              this.OtherServicesMonth.push(data[i].expenses.otherServices);
              this.FinancialResultMonth.push(data[i].financialResults.result);
              this.RentabilityMonth.push(data[i].financialResults.rentability);
              this.SalaryMonth.push(data[i].salary);
              this.SalaryMonth$.push(data[i].salaryDollar);
              this.WorkMonth.push(data[i].work);
              this.WorkMonth$.push(data[i].workDollar);
            }
          }
          if ( this.Years.length === 0 &&  this.Months.length === 0 && this.grafic) {
              this.grafic.remove();
              this.graficTab = null;
             } else {
              this.grafic.display = 'block';
              this.graficTab = 'Показатели';
              this.yearsChart();
              this.monthChart();
             }
        },
        // tslint:disable-next-line: no-shadowed-variable
        error => console.log(error)
      );
     }

   monthChart() {
    this.chart = new Chart('servicepriceMonth', {
        type: 'line',
        data: {
          labels: this.Months,
          datasets: [
            {
              data: this.ServicePriceMonth,
              borderColor: '#294D8D',
              backgroundColor: '#294D8D',
              hoverBackgroundColor: '#3cba9f',
              pointRadius: 10,
              fill: false
            }],
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
              }],
              yAxes: [{
                display: true,
               }],
            }
          }
      });
    this.chart = new Chart('expensesMonth', {
        type: 'line',
        data: {
        labels: this.Months,
        datasets: [
         {
           data: this.LaborCostsMonth,
           label: 'расходы на оплату труда',
           borderColor: '#294D8D',
           backgroundColor: '#294D8D',
           hoverBackgroundColor: '#3cba9f',
           pointRadius: 10,
           fill: false
         },
         {
           data: this.AmortizationMonth,
           label: 'амортизация фондов,расходы материалов, комплектующих, износ МБП',
           borderColor: '#00B5F9',
           backgroundColor: '#00B5F9',
           hoverBackgroundColor: '#3cba9f',
           pointRadius: 7,
           fill: false
         },
         {
           data: this.MainAmortizationMonth,
           label: 'амортизация основных фондов',
           borderColor: '#F99300',
           backgroundColor: '#F99300',
           hoverBackgroundColor: '#3cba9f',
           pointRadius: 5,
           fill: false
         },
         {
           data: this.OtherServicesMonth,
           label: 'услуги сторонних организаций',
           borderColor: '#0aa125',
           backgroundColor: '#0aa125',
           hoverBackgroundColor: '#3cba9f',
           pointRadius: 5,
           fill: false
         }
        ],
       },
       options: {
         legend: {
           display: true,
           position: 'bottom',
           labels: {
             boxWidth: 10,
             fontSize: 8,
             fontColor: 'black'}
         },
         scales: {
           xAxes: [{
             display: true,
             ticks: {
               suggestedMin: 0,
               beginAtZero: true
             }
           }],
           yAxes: [{
             display: true,
             ticks: {
               suggestedMin: 0,
               beginAtZero: true
             }
           }],
         }
       }
      });
    this.chart = new Chart('volumeMonthly', {
        type: 'bar',
        data: {
        labels: this.Months,
        datasets: [
         {
           maxBarThickness: 100,
           label: 'внутренний объём (для РУП "ПО Белоруснефть" и его обособленных подразделений)',
           data: this.InnerVolumesMonth,
           borderColor: '#3cba9f',
           backgroundColor: '#294D8D',
           fill: true
         },
         {
           maxBarThickness: 100,
           label: 'сторонний объём (включая объём для дочерних пердприятий и ОАО, входящих в ГПО "Белоруснефть"',
           data: this.OuterVolumesMonth,
           borderColor: '#3cba9f',
           backgroundColor: '#96D8E5',
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            fontSize: 8,
            fontColor: 'black'
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: true
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: true
            }
          }],
        }
      }
     });
    this.chart = new Chart('financesMonth', {
        type: 'bar',
        data: {
          labels: this.Months,
          datasets: [
            {
              label: 'Результат',
              data: this.FinancialResultMonth,
              backgroundColor: '#4c73d4',
              bordercolor: '#294D8D',
              fill: true
            },
            {
             label: 'Рентабельность затрат',
             data: this.RentabilityMonth,
             backgroundColor: '#294D8D',
             bordercolor: '#294D8D',
             fill: true
           },
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 10,
              fontSize: 8,
              fontColor: 'black'
            }
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: true
              }
            }],
          }
        }
    });

    this.chart = new Chart('salaryMonth', {
        type: 'bar',
        data: {
          labels: this.Months,
          datasets: [
            {
              label: 'руб',
              data: this.SalaryMonth,
              backgroundColor: '#294D8D',
              bordercolor: '#294D8D',
              fill: true
            },
            {
              label: '$',
              data: this.SalaryMonth$,
              backgroundColor: '#15d5eb',
              bordercolor: '#294D8D',
              fill: true
            },
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 10,
              fontSize: 8,
              fontColor: 'black'
            }
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: false
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: false
              }
            }],
          }
        }
    });
    this.chart = new Chart('workMonth', {
       type: 'bar',
       data: {
         labels: this.Months,
         datasets: [
           {
             label: 'руб',
             data: this.WorkMonth,
             backgroundColor: '#294D8D',
             bordercolor: '#294D8D',
             fill: true
           },
           {
             label: '$',
             data: this.WorkMonth$,
             backgroundColor: '#15d5eb',
             bordercolor: '#294D8D',
             fill: true
           },
         ]
       },
       options: {
         legend: {
           display: true,
           position: 'bottom',
           labels: {
             boxWidth: 10,
             fontSize: 8,
             fontColor: 'black'
           }
         },
         scales: {
           xAxes: [{
             display: true,
             ticks: {
               suggestedMin: 0,
               beginAtZero: false
             }
           }],
           yAxes: [{
             display: true,
             ticks: {
               suggestedMin: 0,
               beginAtZero: false
             }
           }],
         }
        }
      });
  }
}
