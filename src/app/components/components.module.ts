import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MesAbiertoPageRoutingModule } from '../pages/mes-abierto/mes-abierto-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MesDetalleComponent } from './mes-detalle/mes-detalle.component';
import { PopoverInfoComponent } from './popover-info/popover-info.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    MesDetalleComponent,
    PopoverInfoComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    MesDetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MesAbiertoPageRoutingModule
  ]
})
export class ComponentsModule { }
