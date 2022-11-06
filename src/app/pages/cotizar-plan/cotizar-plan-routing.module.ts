import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarBeneficioPage } from './cotizar-plan.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarBeneficioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarBeneficioPageRoutingModule {}
