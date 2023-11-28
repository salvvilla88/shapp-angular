import { Injectable } from '@angular/core';

// Decorador Injectable para indicar que esta clase puede ser inyectada como servicio
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Nombre del archivo para guardar y recuperar datos
  private readonly FILE_NAME = 'data.json';

  // Método para guardar datos en un archivo JSON
  saveData(data: any): void {
    // Convertir los datos a formato JSON
    const jsonData = JSON.stringify(data);
    // Crear un objeto Blob con el JSON y especificar el tipo como 'application/json'
    const blob = new Blob([jsonData], { type: 'application/json' });
    // Crear un enlace <a> para descargar el archivo
    const link = document.createElement('a');
    // Crear una URL de objeto para el Blob
    link.href = URL.createObjectURL(blob);
    // Establecer el nombre del archivo para la descarga
    link.download = this.FILE_NAME;
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
  }

  // Método asincrónico para recuperar datos desde un archivo JSON
  async retrieveData(): Promise<any> {
    // Realizar una solicitud de fetch para obtener el archivo JSON
    const response = await fetch(this.FILE_NAME);
    // Parsear la respuesta JSON
    const jsonData = await response.json();
    // Devolver los datos obtenidos
    return jsonData;
  }
}
