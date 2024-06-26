import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprobarRechazarOrdenPage } from './aprobar-rechazar-orden.page';

const routes: Routes = [
  {
    path: '',
    component: AprobarRechazarOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprobarRechazarOrdenPageRoutingModule {}
