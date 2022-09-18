import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { CreaTicketPage } from './crea-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: CreaTicketPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaTicketPageRoutingModule {}
