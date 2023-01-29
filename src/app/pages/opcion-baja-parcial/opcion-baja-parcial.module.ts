import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionBajaParcialPageRoutingModule } from './opcion-baja-parcial-routing.module';

import { OpcionBajaParcialPage } from './opcion-baja-parcial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionBajaParcialPageRoutingModule
  ],
  declarations: [OpcionBajaParcialPage]
})
export class OpcionBajaParcialPageModule {}
