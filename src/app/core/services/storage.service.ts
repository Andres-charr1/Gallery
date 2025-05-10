import { Preferences } from '@capacitor/preferences';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly ENTRY_KEY = 'latest_entry';

  async saveLatestEntry(entry: any): Promise<void> {
    try {
      await Preferences.set({
        key: this.ENTRY_KEY,
        value: JSON.stringify(entry),
      });
    } catch (error) {
      console.error('Error al guardar la entrada localmente:', error);
    }
  }

  async getLatestEntry(): Promise<any | null> {
    try {
      const { value } = await Preferences.get({ key: this.ENTRY_KEY });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error al obtener la entrada local:', error);
      return null;
    }
  }

  async clearLatestEntry(): Promise<void> {
    try {
      await Preferences.remove({ key: this.ENTRY_KEY });
    } catch (error) {
      console.error('Error al borrar la entrada local:', error);
    }
  }
}
