import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprobarRechazarOrdenPageRoutingModule } from './aprobar-rechazar-orden-routing.module';

import { AprobarRechazarOrdenPage } from './aprobar-rechazar-orden.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprobarRechazarOrdenPageRoutingModule,
    ComponentsModule,
    PipeModule
  ],
  declarations: [AprobarRechazarOrdenPage]
})
export class AprobarRechazarOrdenPageModule {}
