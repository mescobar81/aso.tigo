import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarBeneficioPageRoutingModule } from './validar-beneficio-routing.module';

import { ValidarBeneficioPage } from './validar-beneficio.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarBeneficioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ValidarBeneficioPage]
})
export class ValidarBeneficioPageModule {}
