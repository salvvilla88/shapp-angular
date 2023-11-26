import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ScatterDataPoint } from 'chart.js/auto';

interface ChartConfig {
  xLabel: string;
  yLabel: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: any;
  @Input() lineColor: string = 'rgba(255, 0, 0, 1)';
  @Input() config: ChartConfig = {
    xLabel: 'Probabilidad',
    yLabel: 'Impacto',
  };

  @ViewChild('scatterplot') scatterplotCanvas!: ElementRef;

  private chartInstance: Chart | null = null;

  constructor() {}

  ngAfterViewInit() {
    this.plotChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.plotChart();
    }
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  getXValues(data: any): number[] {
    const xValues: number[] = [];
  
    for (let i = 1; i <= 30; i++) {
      const xKey = `x${i}`;
      if (data.hasOwnProperty(xKey)) {
        xValues.push(data[xKey]);
      }
    }
  
    return xValues;
  }
  
  getYValues(data: any): number[] {
    const yValues: number[] = [];
  
    for (let i = 1; i <= 30; i++) {
      const yKey = `y${i}`;
      if (data.hasOwnProperty(yKey)) {
        yValues.push(data[yKey]);
      }
    }
  
    return yValues;
  }

  plotChart() {
    console.log('ChartComponent - Input Data:', this.data);
  
    if (this.scatterplotCanvas && this.scatterplotCanvas.nativeElement) {
      const ctx = this.scatterplotCanvas.nativeElement;
  
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const allXValues = this.getXValues(this.data);
      const allYValues = this.getYValues(this.data);

      const maxX = Math.max(...allXValues);
      const maxY = Math.max(...allYValues);
  
      const chartConfig: ChartConfiguration<'scatter' | 'line'> = {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Scatterplot',
              data: this.createDataPoints(this.data),
              pointRadius: 8,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'Line',
              data: this.createDataPoints(this.data),
              type: 'line',
              borderColor: this.lineColor,
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: this.config.xLabel,
              },
              min: 0,
              max: maxX + 5,
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: this.config.yLabel,
              },
              min: 0,
              max: maxY + 5,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      };
  
      this.chartInstance = new Chart(ctx, chartConfig);
    } else {
      console.error('Canvas element not available.');
    }
  }
  

  private createDataPoints(data: any): ScatterDataPoint[] {
    const dataPoints: ScatterDataPoint[] = [];
  
    for (let i = 1; i <= 30; i++) {
      const xKey = `x${i}`;
      const yKey = `y${i}`;
  
      if (data.hasOwnProperty(xKey) && data.hasOwnProperty(yKey)) {
        dataPoints.push({ x: data[xKey], y: data[yKey] });
      }
    }
  
    return dataPoints;
  }
}
