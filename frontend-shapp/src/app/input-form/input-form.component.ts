import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  inputValues: any = {
    x1: 0,
    x2: 0,
    x3: 0,
    y1: 0,
    y2: 0,
    y3: 0
  };

  xInputLabel: string = 'Probabilidad';
  yInputLabel: string = 'Impacto';
  employeeLabels: string[] = ['Valor 1', 'Valor 2', 'Valor 3'];
  impactLabels: string[] = ['Valor 1', 'Valor 2', 'Valor 3'];

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
}
