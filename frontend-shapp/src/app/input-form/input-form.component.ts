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
  employeeLabels: string[] = ['Empleado 1', 'Empleado 2', 'Empleado 3'];
  impactLabels: string[] = ['Impacto 1', 'Impacto 2', 'Impacto 3'];

  editingXLabel: boolean = false;
  editingYLabel: boolean = false;
  newXLabel: string = '';
  newYLabel: string = '';
  editingEmployeeLabels: boolean[] = [false, false, false];
  editingImpactLabels: boolean[] = [false, false, false];
  newEmployeeLabels: string[] = ['', '', ''];
  newImpactLabels: string[] = ['', '', ''];

  @Output() plotClicked = new EventEmitter<any>();

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
  }

  editYLabel() {
    this.editingYLabel = true;
    this.newYLabel = this.yInputLabel;
  }

  saveYLabel(newLabel: string) {
    this.yInputLabel = newLabel;
    this.editingYLabel = false;
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
