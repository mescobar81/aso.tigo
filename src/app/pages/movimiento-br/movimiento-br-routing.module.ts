import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { MovimientoBrPage } from './movimiento-br.page';

const routes: Routes = [
  {
    path: '',
    component: MovimientoBrPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoBrPageRoutingModule {}
