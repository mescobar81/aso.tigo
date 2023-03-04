import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiketsAbiertosPageRoutingModule } from './tikets-abiertos-routing.module';

import { TiketsAbiertosPage } from './tikets-abiertos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from '../../pipes/pipe.module';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiketsAbiertosPageRoutingModule,
    ComponentsModule,
    PipeModule
  ],
  declarations: [TiketsAbiertosPage],
  providers: [FileOpener]
})
export class TiketsAbiertosPageModule {}
