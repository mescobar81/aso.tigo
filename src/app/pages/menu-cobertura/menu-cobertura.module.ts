import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCoberturaPageRoutingModule } from './menu-cobertura-routing.module';

import { MenuCoberturaPage } from './menu-cobertura.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCoberturaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuCoberturaPage]
})
export class MenuCoberturaPageModule {}
