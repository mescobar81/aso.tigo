import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiketsAbiertosPage } from './tikets-abiertos.page';

const routes: Routes = [
  {
    path: '',
    component: TiketsAbiertosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiketsAbiertosPageRoutingModule {}
