import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesPendientesPageRoutingModule } from './ordenes-pendientes-routing.module';

import { OrdenesPendientesPage } from './ordenes-pendientes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesPendientesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OrdenesPendientesPage]
})
export class OrdenesPendientesPageModule {}
