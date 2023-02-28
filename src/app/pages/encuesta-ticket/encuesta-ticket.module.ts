import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaTicketPageRoutingModule } from './encuesta-ticket-routing.module';

import { EncuestaTicketPage } from './encuesta-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestaTicketPageRoutingModule
  ],
  declarations: [EncuestaTicketPage]
})
export class EncuestaTicketPageModule {}
