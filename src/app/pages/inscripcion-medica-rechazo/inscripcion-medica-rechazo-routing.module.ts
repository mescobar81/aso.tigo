import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionMedicaRechazoPage } from './inscripcion-medica-rechazo.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionMedicaRechazoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionMedicaRechazoPageRoutingModule {}
