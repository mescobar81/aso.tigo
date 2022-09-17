import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTrustPipe } from './image-trust.pipe';



@NgModule({
  declarations: [
    ImageTrustPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ImageTrustPipe]
})
export class PipeModule { }
