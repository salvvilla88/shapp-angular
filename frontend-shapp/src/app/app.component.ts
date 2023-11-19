import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ChartComponent) chartComponent: ChartComponent | undefined;
  data: any = { 
    x1: 2,
    x2: 4,
    x3: 6,
    y1: 1,
    y2: 9,
    y3: 4
  };

  ngAfterViewInit() {
  }

  handlePlotClick(data: any) {
    console.log('Input Data:', data);

    if (this.chartComponent) {
      this.chartComponent.data = data;
      this.chartComponent.plotChart();
      console.log('PlotChart called');
    }
  }
}