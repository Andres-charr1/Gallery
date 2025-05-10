import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase = createClient(environment.supabase.url, environment.supabase.key);

  async uploadImage(blob: Blob, path: string): Promise<string> {
    const { data, error } = await this.supabase.storage.from('imagenes').upload(path, blob);
    if (error) throw error;

    const { publicUrl } = this.supabase.storage.from('imagenes').getPublicUrl(path).data;
    return publicUrl;
  }
}

