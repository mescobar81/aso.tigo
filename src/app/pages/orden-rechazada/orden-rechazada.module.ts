import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenRechazadaPageRoutingModule } from './orden-rechazada-routing.module';

import { OrdenRechazadaPage } from './orden-rechazada.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenRechazadaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OrdenRechazadaPage]
})
export class OrdenRechazadaPageModule {}
