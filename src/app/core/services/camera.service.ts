import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CameraService {
  async takePicture(): Promise<Blob> {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      if (!photo.webPath) {
        throw new Error('No se obtuvo una ruta válida de la imagen');
      }

      const response = await fetch(photo.webPath);
      if (!response.ok) {
        throw new Error('Error al cargar la imagen desde webPath');
      }

      return await response.blob();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      throw error; 
    }
  }
}
