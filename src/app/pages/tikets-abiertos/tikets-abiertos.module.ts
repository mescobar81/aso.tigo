import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiketsAbiertosPageRoutingModule } from './tikets-abiertos-routing.module';

import { TiketsAbiertosPage } from './tikets-abiertos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiketsAbiertosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TiketsAbiertosPage]
})
export class TiketsAbiertosPageModule {}
