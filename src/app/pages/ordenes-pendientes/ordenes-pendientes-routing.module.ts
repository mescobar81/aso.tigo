import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesPendientesPage } from './ordenes-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesPendientesPageRoutingModule {}
