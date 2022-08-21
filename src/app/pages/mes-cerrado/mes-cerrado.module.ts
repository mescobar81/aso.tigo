import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesCerradoPageRoutingModule } from './mes-cerrado-routing.module';

import { MesCerradoPage } from './mes-cerrado.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesCerradoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MesCerradoPage]
})
export class MesCerradoPageModule {}
