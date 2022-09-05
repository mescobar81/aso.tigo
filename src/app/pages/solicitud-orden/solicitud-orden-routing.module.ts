import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { SolicitudOrdenPage } from './solicitud-orden.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudOrdenPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudOrdenPageRoutingModule {}
