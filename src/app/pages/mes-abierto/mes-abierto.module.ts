import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesAbiertoPageRoutingModule } from './mes-abierto-routing.module';

import { MesAbiertoPage } from './mes-abierto.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesAbiertoPageRoutingModule,
    ComponentsModule,
    PipeModule
  ],
  declarations: [
    MesAbiertoPage
  ]
})
export class MesAbiertoPageModule {}
