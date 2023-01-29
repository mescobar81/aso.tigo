import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionBajaTotalPageRoutingModule } from './opcion-baja-total-routing.module';

import { OpcionBajaTotalPage } from './opcion-baja-total.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionBajaTotalPageRoutingModule
  ],
  declarations: [OpcionBajaTotalPage]
})
export class OpcionBajaTotalPageModule {}
