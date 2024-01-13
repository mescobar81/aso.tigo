import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTrustPipe } from './image-trust.pipe';
import { ExtraerCadenaPipe } from './extraer-cadena.pipe';
import { FormatoSeparadorMilesPipe } from './formato-separador-miles.pipe';



@NgModule({
  declarations: [
    ImageTrustPipe,
    ExtraerCadenaPipe,
    FormatoSeparadorMilesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageTrustPipe,
    ExtraerCadenaPipe,
    FormatoSeparadorMilesPipe
  ]
})
export class PipeModule { }
