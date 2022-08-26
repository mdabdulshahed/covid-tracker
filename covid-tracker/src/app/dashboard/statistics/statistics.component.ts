import { Component, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subject, takeUntil } from 'rxjs';
import { CODES } from 'src/app/shared/country-codes';
import { CovidApiService } from 'src/app/shared/covid-api.service';
import { TimeZoneService } from 'src/app/shared/regions.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('picker') datePicker: any;

  public countries = [...CODES];
  public userSelectedCountry!: string;
  
  private unsubscriber$ = new Subject<void>();
  public mergeOptions = {};
  public options: EChartsOption = {
    title: {
      text: 'Covid Data'
    },
    legend: {
      data: ['bar', 'bar2']
    },
    tooltip: {},
    xAxis: {
      data: [],
      splitLine: {
        show: false
      }
    },
    yAxis: {},
    series: [
      {
        name: 'bar',
        type: 'bar',
        data: [],
        animationDelay: function (idx: number) {
          return idx * 10;
        }
      },
      {
        name: 'bar2',
        type: 'bar',
        data: [],
        animationDelay: function (idx: number) {
          return idx * 10 + 100;
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
      return idx * 5;
    }
  };

  linechartOptions = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      },
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: [].length - 1
      }
    ],
    title: [
      {
        left: 'center',
        text: 'Gradient along the y axis'
      },
      {
        top: '55%',
        left: 'center',
        text: 'Gradient along the x axis'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: []
      },
      {
        data: [],
        gridIndex: 1
      }
    ],
    yAxis: [
      {},
      {
        gridIndex: 1
      }
    ],
    grid: [
      {
        bottom: '60%'
      },
      {
        top: '60%'
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: []
      },
      {
        type: 'line',
        showSymbol: false,
        data: [],
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };

  public lineChartLabel = '';
  public selectedDate!: string;
  public selectedCountry!: string;
  public startDate!: string;
  public endDate!: string;

  constructor(private covidApiService: CovidApiService, private userCountryService: TimeZoneService) { }

  ngOnInit(): void {
    this.getAllCountryData();
    this.initialData()
  }

  public initialData(): void {
    let date = new Date().toISOString().split('T')[0]
    console.log(date)
    this.selectedCountry = this.userCountryService.getCountryCode()
    console.log(this.selectedCountry)
    this.getHistoryData(this.selectedCountry, date)
  }

  public dateChange(date: Date) {
    this.selectedDate = new Date(date).toISOString().split('T')[0]
    this.getHistoryData(this.selectedCountry, this.selectedDate)
  }

  getAllCountryData(): void {
    this.covidApiService.getStatictics().pipe(takeUntil(this.unsubscriber$))
        .subscribe(response => {
          if (response) {
            console.log(response)
          }
        });
  }

  getHistoryData(country: string, day: string): void {
    this.covidApiService.getHistory(country, day).pipe(takeUntil(this.unsubscriber$))
        .subscribe(response => {
          if (response) {
            this.updateChart(response.response)
          }
        });
  }

  public onSelectCountry(event: any): void {
    this.getHistoryData(event, this.selectedDate)
  }

  public updateChart(response: any): void {
    let weekData: any[] = []
    let recoveredData: any[] = []
    response.forEach((element: { cases: { active: any; recovered: any; }; }) => {
      weekData.push(element.cases.active)
      recoveredData.push(element.cases.recovered)
    });
    this.mergeOptions = {
      title: {
        text: 'Covid Data'
      },
      legend: {
        data: ['Active Cases', 'Recovered']
      },
      tooltip: {},
      xAxis: {
        data: [],
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [
        {
          name: 'Active Cases',
          type: 'bar',
          data: weekData,
          animationDelay: function (idx: number) {
            return idx * 10;
          }
        },
        {
          name: 'Recovered',
          type: 'bar',
          data: recoveredData,
          animationDelay: function (idx: number) {
            return idx * 10 + 100;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx: number) {
        return idx * 5;
      }
    };
  }

  public startDateChange(date: Date): void {
    this.startDate = new Date(date).toISOString().split('T')[0]
  }

  public endDateChange(date: Date): void {
    this.endDate = new Date(date).toISOString().split('T')[0]
  }

  public getHistoryBetweenTimes(): void {
    // to be developed
  }

}
