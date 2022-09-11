import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaTicketPage } from './crea-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: CreaTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaTicketPageRoutingModule {}
