import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuestaTicketPage } from './encuesta-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaTicketPageRoutingModule {}
