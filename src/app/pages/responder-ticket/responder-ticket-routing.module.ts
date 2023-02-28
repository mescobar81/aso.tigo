import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponderTicketPage } from './responder-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: ResponderTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponderTicketPageRoutingModule {}
