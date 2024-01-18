import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudOrdenPageRoutingModule } from './solicitud-orden-routing.module';

import { SolicitudOrdenPage } from './solicitud-orden.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudOrdenPageRoutingModule,
    ComponentsModule,
    PipeModule
  ],
  declarations: [SolicitudOrdenPage]
})
export class SolicitudOrdenPageModule {}
