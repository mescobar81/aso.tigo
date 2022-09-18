import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { MesAbiertoPage } from './mes-abierto.page';

const routes: Routes = [
  {
    path: '',
    component: MesAbiertoPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesAbiertoPageRoutingModule {}
