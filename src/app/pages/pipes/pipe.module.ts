import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTrustPipe } from './image-trust.pipe';
import { ExtraerCadenaPipe } from './extraer-cadena.pipe';



@NgModule({
  declarations: [
    ImageTrustPipe,
    ExtraerCadenaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageTrustPipe,
    ExtraerCadenaPipe
  ]
})
export class PipeModule { }
