import { Component, OnInit } from '@angular/core';
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  ngOnInit(): void {
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public pieChartLabels: Label[] = [['Avengers: EndGame'], ['Avatar'], ['Titanic'], ['Fast & Furious'], ['Harry Potter'], ['Other']];
  public pieChartData: SingleDataSet = [40000000, 30000000, 20000000, 12000000, 10000000, 5000000];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColor: Color[] = [
    {
      backgroundColor: [
        '#fa8072',
        '#66cdaa',
        '#3a6dcf',
        '#5ab6f5',
        '#e4f2f7',
        '#ffdead'
      ],
      borderColor: [

      ]
    }
  ];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


 // LineChart

  lineChartData: ChartDataSets[] = [
    { data: [100, 102, 100, 100, 95, 98, 100, 115, 120, 116], label: '2019' },
    { data: [100, 90, 90, 80, 82, 89, 95, 100, 105, 117], label: '2020' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#fa8072',
      // backgroundColor: '#fa8072',
    },
    {
      borderColor: '#3a6dcf',
      // backgroundColor: '#dda0dd',
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  // BarChart

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [100, 102, 100, 100, 95, 98, 100, 115, 120, 116], label: '2019' },
    { data: [100, 90, 90, 80, 82, 89, 95, 100, 105, 117], label: '2020' }
  ];
}

