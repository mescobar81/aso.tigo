import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { OrdenRechazadaPage } from './orden-rechazada.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenRechazadaPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenRechazadaPageRoutingModule {}
