import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizarAdherentePage } from './cotizar-adherente.page';

const routes: Routes = [
  {
    path: '',
    component: CotizarAdherentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizarAdherentePageRoutingModule {}
