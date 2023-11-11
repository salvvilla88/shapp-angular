import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  x1: number = 0;
  x2: number = 0;
  x3: number = 0;
  y1: number = 0;
  y2: number = 0;
  y3: number = 0;

  @Output() plotClicked = new EventEmitter();

  onPlotClick() {
  this.plotClicked.emit({ x1: this.x1, x2: this.x2, x3: this.x3 });
}

}
