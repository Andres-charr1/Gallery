import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from 'src/app/core/services/camera.service';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  form: FormGroup;
  previewImage: string | null = null;
  imageBlob: Blob | null = null;

  constructor(
    private fb: FormBuilder,
    private camera: CameraService,
    private supabase: SupabaseService,
    private firebase: FirebaseService,
    private localStorage: StorageService,
    private router: Router 
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  async pickImage() {
    try {
      this.imageBlob = await this.camera.takePicture();
      this.previewImage = URL.createObjectURL(this.imageBlob);
      this.form.patchValue({ image: this.imageBlob });
    } catch (err) {
      console.error('Error capturando imagen', err);
    }
  }

  async onSubmit() {
    if (!this.form.valid || !this.imageBlob) return;

    try {
      const fileName = `image-${Date.now()}.jpg`;
      const imageUrl = await this.supabase.uploadImage(this.imageBlob, fileName);

      const entry = {
        description: this.form.value.description,
        imageUrl,
        createdAt: new Date().toISOString()
      };

      await this.firebase.addEntry(entry.description, imageUrl);
      await this.localStorage.saveLatestEntry(entry);

      
      this.form.reset();
      this.previewImage = null;
      this.imageBlob = null;

    
      this.router.navigate(['/list']);

    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
  }
}
