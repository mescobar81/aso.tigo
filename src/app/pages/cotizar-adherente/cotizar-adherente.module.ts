import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizarAdherentePageRoutingModule } from './cotizar-adherente-routing.module';

import { CotizarAdherentePage } from './cotizar-adherente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CotizarAdherentePageRoutingModule
  ],
  declarations: [CotizarAdherentePage]
})
export class CotizarAdherentePageModule {}
