import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimientoBrPage } from './movimiento-br.page';

const routes: Routes = [
  {
    path: '',
    component: MovimientoBrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoBrPageRoutingModule {}
