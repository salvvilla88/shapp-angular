import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ScatterDataPoint } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: any;
  @Input() lineColor: string = 'rgba(255, 0, 0, 1)';

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

  plotChart() {
    console.log('ChartComponent - Input Data:', this.data);
  
    if (this.scatterplotCanvas && this.scatterplotCanvas.nativeElement) {
      const ctx = this.scatterplotCanvas.nativeElement;
  
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const maxX = Math.max(this.data.x1, this.data.x2, this.data.x3);
      const maxY = Math.max(this.data.y1, this.data.y2, this.data.y3);
  
      const chartConfig: ChartConfiguration<'scatter' | 'line'> = {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Scatterplot',
              data: this.createDataPoints(),
              pointRadius: 8,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'Line',
              data: this.createDataPoints(),
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
                text: 'Probabilidad (x)',
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
                text: 'Impacto (y)',
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
  

  private createDataPoints(): ScatterDataPoint[] {
    return [
      { x: this.data.x1, y: this.data.y1 },
      { x: this.data.x2, y: this.data.y2 },
      { x: this.data.x3, y: this.data.y3 },
    ];
  }
}
