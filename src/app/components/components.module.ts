import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MesAbiertoPageRoutingModule } from '../pages/mes-abierto/mes-abierto-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MesDetalleComponent } from './mes-detalle/mes-detalle.component';
import { PopoverInfoComponent } from './popover-info/popover-info.component';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { ModalRechazoSolicitudComponent } from './modal-rechazo-solicitud/modal-rechazo-solicitud.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    MesDetalleComponent,
    PopoverInfoComponent,
    ModalInfoComponent,
    ModalRechazoSolicitudComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    MesDetalleComponent,
    ModalInfoComponent,
    ModalRechazoSolicitudComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MesAbiertoPageRoutingModule
  ]
})
export class ComponentsModule { }
