import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

// Decorador del componente de Angular
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  // Referencia al componente de gráfico mediante ViewChild
  @ViewChild(ChartComponent) chartComponent: ChartComponent | undefined;
  
  // Objeto que almacena los valores de entrada por defecto
  data: any = {
    x1: null, y1: null,
    x2: null, y2: null,
    // ... (x3 hasta y30)
  };

  // Etiquetas por defecto para los ejes X e Y
  xInputLabel: string = 'Probabilidad';
  yInputLabel: string = 'Impacto';

  // Método llamado después de que la vista se inicializa
  ngAfterViewInit() {
  }

  // Método para manejar el clic en el botón de trazado
  handlePlotClick(data: any) {
    console.log('Datos de entrada:', data);

    // Verificar si el componente de gráfico está presente
    if (this.chartComponent) {
      // Actualizar los datos en el componente de gráfico y llamar a la función de trazado
      this.chartComponent.data = data;
      this.chartComponent.plotChart();
      console.log('Se llamó a plotChart');
    }
  }

  // Método para manejar el cambio en las etiquetas
  handleLabelsChanged(labels: { xLabel: string, yLabel: string }) {
    // Verificar si el componente de gráfico está presente
    if (this.chartComponent) {
      // Actualizar las etiquetas y llamar a la función de trazado en el componente de gráfico
      this.xInputLabel = labels.xLabel;
      this.yInputLabel = labels.yLabel;
      this.chartComponent.config = {
        xLabel: this.xInputLabel,
        yLabel: this.yInputLabel,
      };
      this.chartComponent.plotChart();
    }
  }

  // Método para manejar la carga de datos
  handleDataLoaded(loadedData: any) {
    // Actualizar los datos en el componente principal y en el componente de gráfico
    this.data = loadedData;
    if (this.chartComponent) {
      this.chartComponent.data = loadedData;
      this.chartComponent.plotChart();
      console.log('Se llamó a plotChart después de cargar los datos');
    }
  }
}
