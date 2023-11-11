import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit {
  @Input() data: any;

  @ViewChild('scatterplot') scatterplotCanvas!: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    this.plotChart();
  }

  plotChart() {
    console.log('ChartComponent - Input Data:', this.data);
    const ctx = this.scatterplotCanvas.nativeElement;
    const scatterplot = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Grafico',
          data: [
            { x: this.data.x1, y: this.data.y1 },
            { x: this.data.x2, y: this.data.y2 },
            { x: this.data.x3, y: this.data.y3 },
          ],
          pointRadius: 8,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
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
            max: 10,
            ticks: {
              stepSize: 1,
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Impacto (y)',
            },
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
            }
          },
        }
      }
    });
  }
}
