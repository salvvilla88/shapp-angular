import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  inputValues: any = {
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
  employeeLabels: string[] = this.generateLabels(30, 'Valor');
  impactLabels: string[] = this.generateLabels(30, 'Valor');

  editingXLabel: boolean = false;
  editingYLabel: boolean = false;
  newXLabel: string = '';
  newYLabel: string = '';
  editingEmployeeLabels: boolean[] = [false, false, false];
  editingImpactLabels: boolean[] = [false, false, false];
  newEmployeeLabels: string[] = ['', '', ''];
  newImpactLabels: string[] = ['', '', ''];

  @Output() plotClicked = new EventEmitter<any>();
  @Output() labelsChanged = new EventEmitter<{ xLabel: string, yLabel: string }>();
  @Output() dataLoaded = new EventEmitter<any>();

  generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  onPlotClick() {
    this.plotClicked.emit(this.inputValues);
  }

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

  generateLabels(count: number, baseLabel: string): string[] {
    return Array.from({ length: count }, (_, index) => `${baseLabel} ${index + 1}`);
  }

  constructor(private dataService: DataService) {}

  onSaveClick() {
    this.dataService.saveData(this.inputValues);
  }

  onLoadDataClick() {
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
