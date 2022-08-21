import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesAbiertoPage } from './mes-abierto.page';

const routes: Routes = [
  {
    path: '',
    component: MesAbiertoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesAbiertoPageRoutingModule {}
