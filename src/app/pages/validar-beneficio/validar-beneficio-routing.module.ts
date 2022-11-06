import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarBeneficioPage } from './validar-beneficio.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarBeneficioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarBeneficioPageRoutingModule {}
