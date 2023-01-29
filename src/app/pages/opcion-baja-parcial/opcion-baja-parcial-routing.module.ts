import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionBajaParcialPage } from './opcion-baja-parcial.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionBajaParcialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionBajaParcialPageRoutingModule {}
