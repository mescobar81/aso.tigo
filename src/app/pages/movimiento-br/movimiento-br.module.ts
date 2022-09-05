import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimientoBrPageRoutingModule } from './movimiento-br-routing.module';

import { MovimientoBrPage } from './movimiento-br.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimientoBrPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MovimientoBrPage]
})
export class MovimientoBrPageModule {}
