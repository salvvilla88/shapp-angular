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
    x1: null, y1: null,
    x2: null, y2: null,
    x3: null, y3: null,
    x4: null, y4: null,
    x5: null, y5: null,
    x6: null, y6: null,
    x7: null, y7: null,
    x8: null, y8: null,
    x9: null, y9: null,
    x10: null, y10: null,
    x11: null, y11: null,
    x12: null, y12: null,
    x13: null, y13: null,
    x14: null, y14: null,
    x15: null, y15: null,
    x16: null, y16: null,
    x17: null, y17: null,
    x18: null, y18: null,
    x19: null, y19: null,
    x20: null, y20: null,
    x21: null, y21: null,
    x22: null, y22: null,
    x23: null, y23: null,
    x24: null, y24: null,
    x25: null, y25: null,
    x26: null, y26: null,
    x27: null, y27: null,
    x28: null, y28: null,
    x29: null, y29: null,
    x30: null, y30: null,
  };

  xInputLabel: string = 'Probabilidad';
  yInputLabel: string = 'Impacto';

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

  handleLabelsChanged(labels: { xLabel: string, yLabel: string }) {
    if (this.chartComponent) {
      this.xInputLabel = labels.xLabel;
      this.yInputLabel = labels.yLabel;
      this.chartComponent.config = {
        xLabel: this.xInputLabel,
        yLabel: this.yInputLabel,
      };
      this.chartComponent.plotChart();
    }
  }

  handleDataLoaded(loadedData: any) {
    this.data = loadedData;
    if (this.chartComponent) {
      this.chartComponent.data = loadedData;
      this.chartComponent.plotChart();
      console.log('PlotChart called after data loaded');
    }
  }
}