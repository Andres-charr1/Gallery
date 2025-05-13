import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from 'src/app/core/services/camera.service';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import {
  FirebaseService,
  MultimediaEntry,
} from 'src/app/core/services/firebase.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  form: FormGroup;
  previewImage: string | null = null;
  imageBlob: Blob | null = null;
  mediaList: MultimediaEntry[] = [];

  constructor(
    private fb: FormBuilder,
    private camera: CameraService,
    private supabase: SupabaseService,
    private firebase: FirebaseService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadMediaRecords(); 
  }

  async loadMediaRecords() {
    try {
      this.mediaList = await this.firebase.getMediaRecords();
      console.log('Multimedia cargada:', this.mediaList);
    } catch (error) {
      console.error('Error cargando multimedia:', error);
    }
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

  test() {
  
  }

  async onSubmit() {
    if (!this.form.valid || !this.imageBlob) return;

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      spinner: 'circles',
    });
    await loading.present();

    try {
      const fileName = `image-${Date.now()}.jpg`;
      const imageUrl = await this.supabase.uploadImage(
        this.imageBlob,
        fileName
      );
      console.log('URL de la imagen:', imageUrl);

      await this.firebase.addEntry({
        description: this.form.value.description,
        imageUrl,
        createdAt: new Date().toISOString(),
      });

      this.form.reset();
      this.previewImage = null;
      this.imageBlob = null;
      await loading.dismiss();
      this.router.navigate(['/list']);
    } catch (err) {
      console.error('Error al guardar los datos:', err);
      await loading.dismiss();
    }
  }
}
