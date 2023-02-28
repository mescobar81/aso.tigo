import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderTicketPageRoutingModule } from './responder-ticket-routing.module';

import { ResponderTicketPage } from './responder-ticket.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponderTicketPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResponderTicketPage]
})
export class ResponderTicketPageModule {}
