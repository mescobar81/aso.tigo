import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionBajasPageRoutingModule } from './opcion-bajas-routing.module';

import { OpcionBajasPage } from './opcion-bajas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionBajasPageRoutingModule
  ],
  declarations: [OpcionBajasPage]
})
export class OpcionBajasPageModule {}
