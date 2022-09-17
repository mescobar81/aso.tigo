import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaTicketPageRoutingModule } from './crea-ticket-routing.module';

import { CreaTicketPage } from './crea-ticket.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaTicketPageRoutingModule,
    ComponentsModule,
    PipeModule
  ],
  declarations: [CreaTicketPage]
})
export class CreaTicketPageModule {}
