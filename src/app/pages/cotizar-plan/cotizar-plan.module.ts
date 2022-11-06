import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarBeneficioPageRoutingModule } from './cotizar-plan-routing.module';

import { ConsultarBeneficioPage } from './cotizar-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarBeneficioPageRoutingModule
  ],
  declarations: [ConsultarBeneficioPage]
})
export class CotizarPlanPageModule {}
