import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizarAdherentePageRoutingModule } from './cotizar-adherente-routing.module';

import { CotizarAdherentePage } from './cotizar-adherente.page';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizarAdherentePageRoutingModule,
    PipeModule
  ],
  declarations: [CotizarAdherentePage]
})
export class CotizarAdherentePageModule {}
