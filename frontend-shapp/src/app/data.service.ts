import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly FILE_NAME = 'data.json';

  saveData(data: any): void {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.FILE_NAME;
    link.click();
  }

  async retrieveData(): Promise<any> {
    const response = await fetch(this.FILE_NAME);
    const jsonData = await response.json();
    return jsonData;
  }
}
