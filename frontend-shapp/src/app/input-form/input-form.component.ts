import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

// Decorador del componente de Angular
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  // Objeto que almacena los valores de entrada del formulario
  inputValues: any = {
    x1: null, y1: null,
    x2: null, y2: null,
    // ... (x3 hasta y30)
  };

  // Etiquetas por defecto para los ejes X e Y
  xInputLabel: string = 'Probabilidad';
  yInputLabel: string = 'Impacto';

  // Etiquetas predeterminadas para los empleados e impacto
  employeeLabels: string[] = this.generateLabels(30, 'Valor');
  impactLabels: string[] = this.generateLabels(30, 'Valor');

  // Variables para la edición de etiquetas
  editingXLabel: boolean = false;
  editingYLabel: boolean = false;
  newXLabel: string = '';
  newYLabel: string = '';
  editingEmployeeLabels: boolean[] = [false, false, false];
  editingImpactLabels: boolean[] = [false, false, false];
  newEmployeeLabels: string[] = ['', '', ''];
  newImpactLabels: string[] = ['', '', ''];

  // Eventos de salida para el clic en el botón de trazado, cambio de etiquetas y carga de datos
  @Output() plotClicked = new EventEmitter<any>();
  @Output() labelsChanged = new EventEmitter<{ xLabel: string, yLabel: string }>();
  @Output() dataLoaded = new EventEmitter<any>();

  // Método para generar un array de números consecutivos de longitud especificada
  generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  // Método llamado al hacer clic en el botón de trazado
  onPlotClick() {
    this.plotClicked.emit(this.inputValues);
  }

  // Métodos para la edición y guardado de etiquetas X e Y
  editXLabel() {
    this.editingXLabel = true;
    this.newXLabel = this.xInputLabel;
  }

  saveXLabel(newLabel: string) {
    this.xInputLabel = newLabel;
    this.editingXLabel = false;
    this.labelsChanged.emit({ xLabel: this.xInputLabel, yLabel: this.yInputLabel });
  }

  editYLabel() {
    this.editingYLabel = true;
    this.newYLabel = this.yInputLabel;
  }

  saveYLabel(newLabel: string) {
    this.yInputLabel = newLabel;
    this.editingYLabel = false;
    this.labelsChanged.emit({ xLabel: this.xInputLabel, yLabel: this.yInputLabel });
  }

  // Métodos para la edición y guardado de etiquetas de empleados e impacto
  editEmployeeLabel(index: number) {
    this.editingEmployeeLabels[index] = true;
    this.newEmployeeLabels[index] = this.employeeLabels[index];
  }

  saveEmployeeLabel(index: number, newLabel: string) {
    this.employeeLabels[index] = newLabel;
    this.editingEmployeeLabels[index] = false;
  }

  editImpactLabel(index: number) {
    this.editingImpactLabels[index] = true;
    this.newImpactLabels[index] = this.impactLabels[index];
  }

  saveImpactLabel(index: number, newLabel: string) {
    this.impactLabels[index] = newLabel;
    this.editingImpactLabels[index] = false;
  }

  // Método para generar etiquetas de empleados e impacto
  generateLabels(count: number, baseLabel: string): string[] {
    return Array.from({ length: count }, (_, index) => `${baseLabel} ${index + 1}`);
  }

  // Constructor del componente que inyecta el servicio de datos
  constructor(private dataService: DataService) {}

  // Método llamado al hacer clic en el botón de guardar
  onSaveClick() {
    this.dataService.saveData(this.inputValues);
  }

  // Método llamado al hacer clic en el botón de cargar datos
  onLoadDataClick() {
    // Crear un input de tipo archivo para seleccionar el archivo JSON
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.readFile(file);
      }
    });
    fileInput.click();
  }

  // Método privado para leer el contenido de un archivo JSON
  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      const loadedData = JSON.parse(fileContent);
      this.dataLoaded.emit(loadedData);
      this.inputValues = loadedData;      
    };
    reader.readAsText(file);
  }
}
