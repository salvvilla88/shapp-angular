import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ScatterDataPoint } from 'chart.js/auto';

// Interfaz para configuración del gráfico
interface ChartConfig {
  xLabel: string;
  yLabel: string;
}

// Decorador del componente de Angular
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  // Entradas del componente
  @Input() data: any;
  @Input() lineColor: string = 'rgba(255, 0, 0, 1)';
  @Input() config: ChartConfig = {
    xLabel: 'Probabilidad',
    yLabel: 'Impacto',
  };

  // Método para trazar el gráfico
  plotChart() {
    console.log('ChartComponent - Datos de entrada:', this.data);
  
    if (this.scatterplotCanvas && this.scatterplotCanvas.nativeElement) {
      const ctx = this.scatterplotCanvas.nativeElement;
  
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const allXValues = this.getXValues(this.data);
      const allYValues = this.getYValues(this.data);

      const maxX = Math.max(...allXValues);
      const maxY = Math.max(...allYValues);
  
      // Configuración del gráfico
      const chartConfig: ChartConfiguration<'scatter' | 'line'> = {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Diagrama de dispersión',
              data: this.createDataPoints(this.data),
              pointRadius: 8,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'Línea',
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
  
      // Crear una nueva instancia del gráfico
      this.chartInstance = new Chart(ctx, chartConfig);
    } else {
      console.error('Elemento de lienzo no disponible.');
    }
  }

  // Referencia al elemento del gráfico en la vista
  @ViewChild('scatterplot') scatterplotCanvas!: ElementRef;

  // Instancia del gráfico
  private chartInstance: Chart | null = null;

  // Constructor del componente
  constructor() {}

  // Método llamado después de la inicialización de la vista
  ngAfterViewInit() {
    this.plotChart();
  }

  // Método llamado cuando hay cambios en las entradas del componente
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.plotChart();
    }
  }

  // Método llamado antes de destruir el componente
  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  // Método para crear puntos de datos a partir de los datos de entrada
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

  // Método para obtener los valores de X a partir de los datos
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
  
  // Método para obtener los valores de Y a partir de los datos
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
  
}
