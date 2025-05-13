import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './services/firebase.service';
import { SupabaseService } from './services/supabase.service';
import { CameraService } from './services/camera.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FirebaseService,
    SupabaseService,
    CameraService,
  
  ],
})
export class CoreModule { }
