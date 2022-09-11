import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenRechazadaPage } from './orden-rechazada.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenRechazadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenRechazadaPageRoutingModule {}
