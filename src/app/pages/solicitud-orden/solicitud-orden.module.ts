import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudOrdenPageRoutingModule } from './solicitud-orden-routing.module';

import { SolicitudOrdenPage } from './solicitud-orden.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudOrdenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SolicitudOrdenPage]
})
export class SolicitudOrdenPageModule {}
