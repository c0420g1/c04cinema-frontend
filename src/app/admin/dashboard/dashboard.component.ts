import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets, RadialChartOptions} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September','October','November','December'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45000, 37000, 60000, 70000, 46000, 33000 , 24000, 65000, 23000, 64000, 23000, 54000], label: 'Best Month' }
  ];

  doughnutChartLabels: Label[] = ['Avenger: Infinity War', 'Harry Potter And The Gobble Fire', 'Spider Man 4'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
    'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
  ];
  public radarChartType: ChartType = 'radar';
}
