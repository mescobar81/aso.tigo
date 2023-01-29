import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionBajasPage } from './opcion-bajas.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionBajasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionBajasPageRoutingModule {}
