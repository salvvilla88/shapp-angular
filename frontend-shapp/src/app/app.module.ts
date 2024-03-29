import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [AppComponent, InputFormComponent, ChartComponent],
  imports: [BrowserModule, FormsModule], 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
