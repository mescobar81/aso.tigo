import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionMedicaRechazoPageRoutingModule } from './inscripcion-medica-rechazo-routing.module';

import { InscripcionMedicaRechazoPage } from './inscripcion-medica-rechazo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionMedicaRechazoPageRoutingModule
  ],
  declarations: [InscripcionMedicaRechazoPage]
})
export class InscripcionMedicaRechazoPageModule {}
